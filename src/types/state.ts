export enum StateStatus {
  IDLE,
  PENDING,
  RESOLVED,
  REJECTED,
}

export enum TypeActionState {
  CREATE,
  UPDATE,
  DELETE,
}

export interface ActionState {
  status: StateStatus;
  error: string;
  type: TypeActionState;
}

export interface DeleteModalState {
  isOpen: boolean;
  isLoading: boolean;
  dataId: number | string;
  item: string;
}
