/**
 * Este service contiene la configuración de las tablas y metodo de exportar excel
 */

import { Injectable } from "@angular/core";
import { ExcelService } from "./excel.service";

@Injectable()
export class ConfigTables {

    rowsPerPage = [10, 20, 50, 100];
    rowCount = 10;
    responsive = true;
    paginator = true;


    public constructor(public excelService: ExcelService) {

    }

    /**
     * General method for export data on main list to Excel
     * @param filter string of filter , field goblalfilter
     * @param fileName string of the filename
     * @param columns array for the columns of the file to show
     * @param data array of the data to export
     */
    exportToExcel(
        filter: string,
        fileName: string,
        columns: any[],
        data: any[]
    ) {
        this.excelService.exportAsExcelFile(data, fileName, filter, columns);
    }

}