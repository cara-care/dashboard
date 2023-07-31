export enum EpostStatus {
  PENDING_APPROVAL = 'PENDING_APPROVAL',
  EPOST_ACCEPTED = 'EPOST_ACCEPTED',
  EPOST_REJECTED = 'EPOST_REJECTED',
  EPOST_PROCESSING = 'EPOST_PROCESSING',
  EPOST_ACCEPTED_FOR_PRINT = 'EPOST_ACCEPTED_FOR_PRINT',
  EPOST_PRINT_AND_DELIVERY = 'EPOST_PRINT_AND_DELIVERY',
  EPOST_ERROR = 'EPOST_ERROR',
}

export enum ReviewType {
  POST = 'POST',
  DELETE = 'DELETE',
}
export interface PrescriptionsResponse {
  count: number;
  next: string | null;
  prev: string | null;
  results: Prescription[];
}

export interface Prescription {
  approved: string | null;
  approver: {
    id: number;
    name: string;
  } | null;
  id: number;
  letterID: number | null;
  letterReceiver: string;
  letterSender: string;
  pdfFile: string;
  status: string;
  uploaded: string;
  uploader: {
    id: number;
    name: string;
  };
  errorMessage: string;
}
