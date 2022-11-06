export class DataService {
    export() {
        let file = new Blob([btoa(JSON.stringify(localStorage))], {type: "charset=utf-8"});
        let a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = 'vault.data';
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0);
    }

    import(file: any) {
        let reader = new FileReader();
        reader.readAsText(file);
        reader.onload = () => {
            if (typeof reader.result == "string")
            {
                let data = JSON.parse(atob(reader.result));
                Object.keys(data).forEach(function (k: any) {
                    localStorage.setItem(k, data[k]);
                })
            }
        }
        reader.onloadend = () => {
            location.reload()
        }
    }
        
}