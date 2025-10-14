const name = "anne";
        const age = 20;
        const isStatus = true;

        alert(`Name: ${name}, Age: ${age}, Status: ${status}`);


        let x = 10;
        let y = 5;
        console.log("This is Addition: ", x + y);
        console.log("Multiplication: ", x * y);
        console.log("Division: ", x / y);
        console.log("Subtraction: ", x - y);

        if (true) {
            var a = 10;
            let b = 20;
            const c = 30;
            console.log("True");
        }

        const Person = {

            fname : "Rubyann",
            lname : "Eduria",
            age : 20,
            favorite : [ "mango float", "tktok", "sleeping", "sting"],
            hobbys : {
                genadula : "nagatiktok",
                genatanaw : "anime",
                genabuhat : "tulog",
            }
        };
        console.log(Person.fname + " " + Person.lname);
        console.log(Person.fname, Person.lname);
        console.log(Person.favorite[3]);
        console.log(Person.hobbys.genabuhat);
        console.log(Person);


        const People = [

            {
                id: 1,
                fullName: "Rubyann Eduria",
                age: 20,
            },

            {
                id: 2,
                fullName: "Analiza Eduria",
                age: 36,
            },
            {
                id: 3,
                fullName: "Lyndie Eduria",
                age: 16,

            }

        ];
        console.log(People);
        console.log(People[0].fullName);

        for (let j = 0; j < People.length; j++){
            console.log(People[j].fullName);
        }

        const arr = [1,2,3];
        arr.push(4);
        console.log(arr);

