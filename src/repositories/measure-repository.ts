type Measure = {
	id: string;
	measure_datetime: Date;
	measure_type: 'GAS' | 'WATER';
	has_confirmed: boolean;
	image_address: string;
	customer_code: string;
	measure_value: number;
};

export type CreateImageProps = {
	customer_code: string;
	measure_datetime: Date;
	measure_type: 'GAS' | 'WATER';
	image_address: string;
	measure_value: number;
};

export type GetMeasureByCustomerProps = {
	customer_code: string;
	measure_datetime: Date;
	measure_type: 'GAS' | 'WATER';
};

export type GetMeasureByIdProps = {
	measure_uuid: string;
};

export type UpdateMeasureProps = {
	measure_uuid: string;
	confirmed_value: number;
};

export type ListMeasureByCustomerProps = {
	customer_code: string;
	measure_type?: 'WATER' | 'GAS';
};

export interface MeasureRepository {
	create: (data: CreateImageProps) => Promise<Measure>;
	getMeasureByCustomer: (
		data: GetMeasureByCustomerProps,
	) => Promise<Measure | null>;
	getMeasureById: (data: GetMeasureByIdProps) => Promise<Measure | null>;
	updateMeasure: (data: UpdateMeasureProps) => Promise<Measure | null>;
	listMeasureByCustomer: (
		data: ListMeasureByCustomerProps,
	) => Promise<Measure[] | null>;
}
