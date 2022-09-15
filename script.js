
class Excel{
    constructor(content){
        this.content = content;
    }

    header(){   //lo utilizamos para mostrar la cabecera
        return this.content[0];
    }
    rows(){
        //return this.content.slice(1, this.content.length);
        return new RowCollection(this.content.slice(1, this.content.length));
    }
}

class RowCollection{
    constructor(rows){
        this.rows = rows;
    }

    first(){  //para q nos entregue el primero
        return new Row(this.rows[0]);
    }

    get(index){   //para q nos entregue todos los elementos o filas
             // sin "index", trae todas las filas. Con el "index", trae la q le indiquemos.
        return new Row(this.rows[index]);
    }

    count(){   //cuenta todos los elementos
        return this.rows.length;
    }

    role(){

    }
}

class Row{      //creamos una clase para manejar o manipular una sola fila
    
    constructor(row){
        this.row = row;
    }
    
    name(){   //para obtener el nombre
        return this.row[0];
    }

    country(){
        return this.row[1];
    }

    role(){
        return this.row[2];
    }

    salary(){
        return this.row[3];
    }

}

class ExcelPrinter{
    static print(tableId, excel){
        const table = document.getElementById(tableId);
        
        excel.header().forEach(title => {
            table.querySelector("thead>tr").innerHTML += `<td>${title}</td>`;
        });

        for (let index = 0; index < excel.rows().count(); index++){
            const row = excel.rows().get(index);
            table.querySelector("tbody").innerHTML += `
                <tr>
                    <td>${row.name()}</td>
                    <td>${row.country()}</td>
                    <td>${row.role()}</td>
                    <td>${row.salary()}</td>
                </tr>
            `
        }
    }
}



const excelInput = document.getElementById("excel-input");

excelInput.addEventListener("change", async function(){
    
    const content = await readXlsxFile(excelInput.files[0])
    
    const excel = new Excel(content);

    console.log(ExcelPrinter.print("excel-table", excel));

})
