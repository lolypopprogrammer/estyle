import { Injectable, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { BlobServiceClient, ContainerClient } from '@azure/storage-blob';

@Injectable()
export class BlobStorageService {

  private blobServiceClient: BlobServiceClient;
  private containerClients = new Map<string, ContainerClient>();

  constructor() {
    this.initBlobStorageConnection();
  }

  private async initBlobStorageConnection() {
    try {
      this.blobServiceClient = await BlobServiceClient.fromConnectionString(process.env.STORAGE_ACCOUNT_CONNECTION_STRING);
      this.containerClients.set(
        process.env.VARIATIONS_BLOB_CONTAINER,
        await this.blobServiceClient.getContainerClient(process.env.VARIATIONS_BLOB_CONTAINER),
      );
      this.containerClients.set(
        process.env.CATEGORIES_BLOB_CONTAINER,
        await this.blobServiceClient.getContainerClient(process.env.CATEGORIES_BLOB_CONTAINER),
      );
      this.containerClients.set(
        process.env.STYLEGUIDE_VARIATION_BLOB_CONTAINER,
        await this.blobServiceClient.getContainerClient(process.env.STYLEGUIDE_VARIATION_BLOB_CONTAINER),
      );
      return true;
    } catch (err) {
      return false;
    }
  }

  async uploadToBlobStorage(name: string, file: any, client: string): Promise<string> {
    const containerClient = await this.getContainerClient(client);
    const blockBlobClient = containerClient.getBlockBlobClient(name);
    await blockBlobClient.upload(file, file.length);
    return blockBlobClient.url;
  }

  async getBlob(name: string, client: string): Promise<Buffer> {
    const containerClient = await this.getContainerClient(client);
    const blobClient = containerClient.getBlockBlobClient(name);
    try {
      const buffer = await blobClient.downloadToBuffer();
      return buffer;
    } catch (err) {
      return null;
    }
  }

  private async getContainerClient(client: string): Promise<ContainerClient> {
    const containerClient = this.containerClients.get(client);
    if (!containerClient) {
      const res = await this.initBlobStorageConnection();
      if (!res) throw new InternalServerErrorException('Failed to initialize Storage connection');
      return this.containerClients.get(client);
    }
    return containerClient;
  }
}
