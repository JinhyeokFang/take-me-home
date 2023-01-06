import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';

export class TestModule extends TestingModule {
  static async getModule(): Promise<TestModule> {
    const testModuleBuilder = Test.createTestingModule(AppModule.metadata);
    return await testModuleBuilder.compile();
  }
}
