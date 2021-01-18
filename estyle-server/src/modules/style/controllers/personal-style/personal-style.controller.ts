import {Controller, Post, Body, Get, Param, NotFoundException, Patch, Delete, UseGuards} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {ApiTags, ApiCreatedResponse, ApiBearerAuth} from '@nestjs/swagger';
import {Model} from 'mongoose';
import {JwtAuthGuard} from '../../../auth/guards/jwt.guard';
import {PersonalStyleRepository} from '../../models/PersonalStyle/personal-style.repository';
import {PersonalStyleInterface} from '../../models/PersonalStyle/personal-style.schema';
import {PersonalStyleDto} from './dto/personal-style.dto';
import {PersonalStylePostDto} from './dto/personal-style-post.dto';
import {PersonalStylePatchDto} from './dto/personal-style-patch.dto';
import {PersonalStyleFactory} from '../../models/PersonalStyle/personal-style.factory';

@ApiTags('Personal Style')
@Controller('personal-style')
export class PersonalStyleController {
    personalStyleRepository: PersonalStyleRepository;

    constructor(
        @InjectModel('PersonalStyle') PersonalStyleModel: Model<PersonalStyleInterface>,
    ) {
        this.personalStyleRepository = new PersonalStyleRepository(PersonalStyleModel);
    }


    @ApiCreatedResponse({
        type: PersonalStyleDto,
    })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Post('')
    async createStyle(@Body() body: PersonalStylePostDto) {
        const style = PersonalStyleFactory.create(body);
        const created = await this.personalStyleRepository.create(style);
        return created.toJson();
    }

    @ApiCreatedResponse({
        isArray: true,
        type: PersonalStyleDto,
    })
    @Get('')
    async findAllStyles() {
        const found = await this.personalStyleRepository.find();
        return found.map(style => style.toJson());
    }

    @ApiCreatedResponse({
        type: PersonalStyleDto,
    })
    @Get(':id')
    async findStyleById(@Param('id') id: string) {
        const found = await this.personalStyleRepository.findById(id);
        if (!found) throw new NotFoundException();
        return found.toJson();
    }

    @ApiCreatedResponse({
        type: PersonalStyleDto,
    })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    async updateStyleById(
        @Param('id') id: string,
        @Body() body: PersonalStylePatchDto,
    ) {
        const found = await this.personalStyleRepository.findById(id);
        if (!found) throw new NotFoundException();
        const style = PersonalStyleFactory.create({...found.toObject(), ...body});
        const updated = await this.personalStyleRepository.update(style);
        return updated.toJson();
    }

    @ApiCreatedResponse({
        type: PersonalStyleDto,
    })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async archiveStyleById(
        @Param('id') id: string,
    ) {
        const found = await this.personalStyleRepository.findById(id);
        if (!found) throw new NotFoundException();
        found.isArchived = true;
        const updated = await this.personalStyleRepository.update(found);
    }
}
