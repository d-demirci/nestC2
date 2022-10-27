import { Module } from '@nestjs/common';
import { UniqueError } from './errors/unique-error.error';

@Module({
  imports: [UniqueError],
  controllers: [],
  providers: [],
  exports: [UniqueError],
})
export class SharedModule {}
