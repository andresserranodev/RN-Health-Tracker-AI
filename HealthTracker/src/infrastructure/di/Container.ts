import {IBloodPressureRepository} from '@domain/repositories/IBloodPressureRepository';
import {IGeminiRepository} from '@domain/repositories/IGeminiRepository';
import {geminiRepository} from '@infrastructure/repositories/GeminiRepository';
import {inMemoryBloodPressureRepository} from '@infrastructure/repositories/InMemoryBloodPressureRepository';

export class Container {
  private static instance: Container;

  private _geminiRepository: IGeminiRepository;
  private _bloodPressureRepository: IBloodPressureRepository;

  private constructor() {
    this._geminiRepository = geminiRepository;
    this._bloodPressureRepository = inMemoryBloodPressureRepository;
  }

  static getInstance(): Container {
    if (!Container.instance) {
      Container.instance = new Container();
    }
    return Container.instance;
  }

  get geminiRepository(): IGeminiRepository {
    return this._geminiRepository;
  }

  get bloodPressureRepository(): IBloodPressureRepository {
    return this._bloodPressureRepository;
  }
}

export const container = Container.getInstance();
