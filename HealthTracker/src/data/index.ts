import { Platform } from "react-native";
import { IBloodPressureRepository } from "./repositories/bloodPressureRepository";

import { bloodPressureRepository as mmKvbloodPressureRepository } from "./mmkvBloodPressureRepository";
import { bloodPressureRepository as volatileBloodPressureRepository } from "./volatileBloodPressureRepository";

// Inyección de Dependencias explícita basada en la plataforma
const bloodPressureRepository: IBloodPressureRepository =
  Platform.OS === "android"
    ? mmKvbloodPressureRepository
    : volatileBloodPressureRepository;

export default bloodPressureRepository;
