/*
* Copyright (c) 2019 Software AG, Darmstadt, Germany and/or its licensors
*
* SPDX-License-Identifier: Apache-2.0
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

var request = require("request");

module.exports = function () {
    this.id = "prepare-multi-insert-mysql";
    this.label = "Prepare MySQL Multiple Insert";
    this.help = "Converts a json array into a string that can be used in a MySQL insert (like, for example: ('1','2018-01-01','test string'),('2','2018-02-02','test string2 ')). The column names provided as input must match the property names in the object array.";
    this.input = {
        title: "MySQL Prep 4 Insert Input",
        type: "object",
        properties: {
            inColumns: {
                title: "Columns to prepare",
                type: "string",
                description: "CSV list of the columns that need to be prepared. Only these columns will be extracted from the array of objects passed as input. Currently, property name and column name must match.",
                minLength: 1
            },
            inputArray: {
                title: "Object array to convert",
                type: "any",
                description: "Array of objects that need to be converted",
                minLength: 1
            },
        }
    };

    this.output = {
        title: "Output",
        type: "object",
        properties: {
            insertKeys: {
                title: "Columns",
                type: "string"
            },
            insertValues: {
                title: "Values",
                type: "string"
            }
        }
    };

    this.execute = function (input, output) {
        if (input.inputArray && Array.isArray(input.inputArray) && input.inColumns) {
            const varst = input.inColumns.split(",");
            if (varst && varst.length > 0) {
                var r4m = input.inputArray.map(function (item, idx) {
                    var row = "("
                    for (let i = 0; i < varst.length; i++) {
                        const key = varst[i].trim();
                        row += "'" + item[key] + "',";
                    }
                    // replace the ',' at the end for a ')'
                    row = row.replace(/,$/, ")");
                    return row;
                })
                output(null, {
                    insertValues: r4m.toString(),
                    insertKeys: "(" + varst.toString() + ")"
                });
            }
        }
    }

}