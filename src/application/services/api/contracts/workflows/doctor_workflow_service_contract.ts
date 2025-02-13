

export interface DoctorWorkflowServiceContract {
  handleDoctorCreated(doctorId: string, fullName: string): Promise<void>;
  handleDoctorUpdated(
    doctorId: string,
    updatedFields: Record<string, any>
  ): Promise<void>;
}