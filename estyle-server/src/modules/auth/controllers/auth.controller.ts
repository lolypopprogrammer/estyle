import { Controller, Post, Body, BadRequestException, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiBearerAuth } from '@nestjs/swagger';
import { SendGridService } from '../../../common/services/sendgrid.service';
import { LoginPostDto } from '../dto/login-post.dto';
import { SignupPostDto } from '../dto/signup-post.dto';
import { AuthService } from '../auth.service';
import { LoginDto } from '../dto/login.dto';
import { ForgotPostDto } from '../dto/forgot-post.dto';
import { ResetPostDto } from '../dto/reset-post.dto';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { User } from 'src/modules/user/models/user/user.model';
import { TokenDto } from '../dto/token.dto';
import { UserFactory } from '../../user/models/user/user.factory';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly mailService: SendGridService,
  ) {}

  @ApiOkResponse({
    type: LoginDto,
  })
  @Post('login')
  async login(@Body() body: LoginPostDto) {
    const user = await this.authService.findByEmail(body.email);
    if (!user) throw new BadRequestException();
    const isMatching = await user.isMatchingPassword(body.password);
    if (!isMatching) throw new BadRequestException();
    const token = await this.authService.sign({ sub: user.id });
    return {
      token,
      user: user.toJson(),
    };
  }

  @ApiOkResponse({
    type: LoginDto,
  })
  @Post('signup')
  async signup(@Body() body: SignupPostDto) {
    const user = UserFactory.create(body);
    await user.setPassword(body.password);
    const created = await this.authService.repository.create(user);
    const token = await this.authService.sign({ sub: created.id });
    return {
      token,
      user: created.toJson(),
    };
  }

  @ApiOkResponse({
    type: TokenDto,
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('refresh')
  async refresh(@CurrentUser() user: User) {
    const token = await this.authService.sign({ sub: user.id });
    return { token };
  }

  @ApiOkResponse()
  @Post('forgot-password')
  async forgotPassword(@Body() data: ForgotPostDto) {
    const { user, forgot } = await this.authService.forgot(data.email);
    const link = `${process.env.APP_URL}/account/reset/${forgot.token}`;
    await this.mailService.send({
      to: [user.email],
      subject: 'Forgot password',
      html: `Hi! Please click this link to reset your password: <a href="${link}">${link}</a>`,
    });
  }

  @ApiOkResponse({
    type: LoginDto,
  })
  @Post('reset-password')
  async resetPassword(@Body() data: ResetPostDto) {
    return this.authService.reset(data.token, data.password);
  }
}
