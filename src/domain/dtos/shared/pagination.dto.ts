import { sharedErrors } from "../../../config";


const { invalidParameters, invalidPage, invalidLimit } = sharedErrors;
export class PaginationDto {

    private constructor(
        public readonly page: number,
        public readonly limit: number,
    ) { }

    static create(page: number = 1, limit: number = 10): [string?, string?, PaginationDto?] {

        if (isNaN(page) || isNaN(limit)) return [invalidParameters.message, invalidParameters.code];

        if (page <= 0) return [invalidPage.message, invalidPage.code];
        if (limit <= 0) return [invalidPage.message, invalidPage.code];

        return [undefined, undefined, new PaginationDto(page, limit)];

    }

}