
import {Injectable} from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable()
export class ExcelService {
    constructor() {
    }

    public exportAsExcelFile(
        json: any[],
        excelFileName: string,
        filter?: string,
        columns?: any[]
    ): void {
        if (columns != undefined && columns.length != 0) {
            // Remover la columna acciones del listado a exportar en excel                      
            json = this.refactorJSON(json, columns);
        }

        if (filter != undefined && filter != '' && filter != null) {
            json = this.filterData(json, filter);
        }

        const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
        const workbook: XLSX.WorkBook = {
            Sheets: {data: worksheet},
            SheetNames: ['data']
        };
        const excelBuffer: any = XLSX.write(workbook, {
            bookType: 'xlsx',
            type: 'array'
        });

        this.saveAsExcelFile(excelBuffer, excelFileName);
    }

    private filterData(data: Array<any>, filter: string, columns?: string[]) {
        const newArray = new Array<any>();

        data.forEach(item => {
            if (this.validateItem(item, filter)) {
                newArray.push(item);
            }
        });

        return newArray;
    }

    private refactorJSON(json: any[], columns: any[]) {
        const newArray = new Array<any>();

        json.forEach(item => {
            const newItem = {};

            if (columns != undefined && columns.length != 0) {
                columns.forEach(column => {
                    const values = column.field.split('.');
                    let value = item[values[0]];

                    for (let index = 1; index < values.length; index++) {
                        if (value != 'string' && value != 'number' && value != undefined) {
                            value = value[values[index]];
                        } else {
                            break;
                        }
                    }

                    newItem[column.header] = value;
                });

                newArray.push(newItem);
            } else {
                newArray.push(item);
            }
        });

        return newArray;
    }

    private validateItem(item: any, filter: string) {
        let flag = false;

        Object.keys(item).forEach(function (key, index) {
            // key: the name of the object key
            // index: the ordinal position of the key within the object
            if (
                filter === undefined ||
                filter === null ||
                (typeof filter === 'string' && filter.trim() === '')
            ) {
                flag = true;
                return flag;
            }

            if (item[key] === undefined || item[key] === null) {
                return false;
            }

            const words = filter.toLowerCase().split(' ');

            for (let index = 0; index < words.length; index++) {
                const element = words[index];

                if (
                    item[key]
                        .toString()
                        .toLowerCase()
                        .indexOf(element) == -1
                ) {
                    return false;
                }
            }

            flag = true;
        });

        return flag;
    }

    private saveAsExcelFile(buffer: any, fileName: string): void {
        const data: Blob = new Blob([buffer], {
            type: EXCEL_TYPE
        });
        FileSaver.saveAs(
            data,
            fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION
        );
    }
}