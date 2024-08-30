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

export type GetMeasureProps = {
	customer_code: string;
	measure_datetime: Date;
	measure_type: 'GAS' | 'WATER';
};

export interface MeasureRepository {
	create: (data: CreateImageProps) => Promise<Measure>;
	getMeasure: (data: GetMeasureProps) => Promise<Measure | null>;
}
