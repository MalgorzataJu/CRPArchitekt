export interface AvailableStudentData {
  id: string;
  fullName: string;
  courseCompletion: string;
  courseEngagement: string;
  projectDegree: string;
  teamProjectDegree: string;
  expectedTypeWork: string;
  targetWorkCity: string;
  expectedContractType: string;
  expectedSalary: number;
  canTakeApprenticeship: boolean;
  monthsOfCommercialExp: number;
}


export interface ReservedStudentsResponse extends AvailableStudentData {
  reservedUntil: Date;
}
