var mysql = require('mysql');
var fs = require('fs'); 0

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "z10mz10m",
  database: 'sql_proj'
});

//CREATE TABLES

// function makeString(jsonFile) {
//   let finalString = [];
//   for (let obj of jsonFile.columns) {
//     let oneColumn = [];
//     for (key in obj) {
//       oneColumn.push(obj[key]);
//     }
//     finalString.push(oneColumn.join(" "));
//   }
//   return finalString.join(", ");
// }

// function convertToDb(jsonFile) {
//   let tableName = jsonFile.table;
//   let con = mysql.createConnection({
//     host: 3306,
//     user: "root",
//     password: "z10mz10m",
//     database: "sql_proj",
//   });

//   con.connect(function (err) {
//     if (err) throw err;
//     console.log("Connected!");
//     let string = makeString(jsonFile);
//     var sql = `CREATE TABLE ${tableName} (${string})`;
//     con.query(sql, function (err, result) {
//       if (err) throw err;
//       console.log("Table created");
//     });
//   });
// }

// fs.readdir("./json", (err, files) => {
//   if (err) return err;
//   files.forEach((file) => {
//     const path = `./json/${file}`;
//     fs.readFile(path, "utf-8", (err, data) => {
//       convertToDb(JSON.parse(data));
//     });
//   });
// });


//INSERT USERS

// INSERT INTO users (name, username, email, PASSWORD)
// VALUES ('John Smith', 'jsmith', 'jsmith@example.com', 'password1'),
//        ('Jane Doe', 'jdoe', 'jdoe@example.com', 'password2'),
//        ('Bob Johnson', 'bjohnson', 'bjohnson@example.com', 'password3'),
//        ('Samantha Williams', 'swilliams', 'swilliams@example.com', 'password4'),
//        ('Michael Brown', 'mbrown', 'mbrown@example.com', 'password5'),
//        ('Emily Davis', 'edavis', 'edavis@example.com', 'password6'),
//        ('Matthew Miller', 'mmiller', 'mmiller@example.com', 'password7'),
//        ('Jacob Garcia', 'jgarcia', 'jgarcia@example.com', 'password8'),
//        ('Nicholas Rodriguez', 'nrodriguez', 'nrodriguez@example.com', 'password9'),
//        ('Anthony Hernandez', 'ahernandez', 'ahernandez@example.com', 'password10'),
//        ('Ashley Moore', 'amoore', 'amoore@example.com', 'password11'),
//        ('Sarah Anderson', 'sanderson', 'sanderson@example.com', 'password12'),
//        ('Justin Thomas', 'jthomas', 'jthomas@example.com', 'password13'),
//        ('Bryan Hernandez', 'bhernandez', 'bhernandez@example.com', 'password14'),
//        ('Ryan Moore', 'rmoore', 'rmoore@example.com', 'password15');

//INSERT TODOS

// INSERT INTO todos (userId, id, title, completed)
// VALUES (1, 1, 'Watch Game of Thrones season 1', true),
//        (2, 2, 'Read Game of Thrones book 1', true),
//        (3, 3, 'Play Game of Thrones video game', false),
//        (4, 4, 'Collect Game of Thrones merchandise', false),
//        (5, 5, 'Attend a Game of Thrones convention', false),
//        (6, 6, 'Watch Game of Thrones season 2', true),
//        (7, 7, 'Read Game of Thrones book 2', true),
//        (8, 8, 'Play Game of Thrones video game', false),
//        (9, 9, 'Collect Game of Thrones merchandise', false),
//        (10, 10, 'Attend a Game of Thrones convention', false),
//        (1, 11, 'Watch Game of Thrones season 3', true),
//        (2, 12, 'Read Game of Thrones book 3', true),
//        (3, 13, 'Play Game of Thrones video game', false),
//        (4, 14, 'Collect Game of Thrones merchandise', false),
//        (5, 15, 'Attend a Game of Thrones convention', false),
//        (6, 16, 'Watch Game of Thrones season 4', true),
//        (7, 17, 'Read Game of Thrones book 4', true),
//        (8, 18, 'Play Game of Thrones video game', false),
//        (9, 19, 'Collect Game of Thrones merchandise', false),
//        (10, 20, 'Attend a Game of Thrones convention', false),
//        (1, 21, 'Watch Game of Thrones season 5', true),
//        (2, 22, 'Read Game of Thrones book 5', true),
//        (3, 23, 'Play Game of Thrones video game', false),
//        (4, 24, 'Collect Game of Thrones merchandise', false),
//        (5, 25, 'Attend a Game of Thrones convention', false),
//        (6, 26, 'Watch Game of Thrones season 6', true),
//        (7, 27, 'Read Game of Thrones book 6', true),
//        (8, 28, 'Play Game of Thrones video game', false),
//        (9, 29, 'Collect Game of Thrones merchandise', false),
//        (10, 30, 'Attend a Game of Thrones convention', false);

//INSERT POSTS

// INSERT INTO posts (userId, id, title, body)
// VALUES (1, 1, 'ChatGPT is Amazing', 'I have been using ChatGPT for a while now, and I have to say it is amazing. It is so easy to use and the results are always accurate'),
//        (2, 2, 'ChatGPT saves me time', 'ChatGPT has helped me save a lot of time in my work. It helps me generate reports and answer questions quickly'),
//        (3, 3, 'ChatGPT is a game changer', 'ChatGPT has completely changed how I work. It has improved my productivity and efficiency'),
//        (4, 4, 'ChatGPT is a lifesaver', 'I dont know what I would do without ChatGPT. It has helped me with so many tasks and saved me so much time'),
//        (5, 5, 'ChatGPT is impressive', 'I am constantly impressed by the capabilities of ChatGPT. It is able to understand and respond to a wide variety of questions'),
//        (6, 6, 'ChatGPT is reliable', 'I can always count on ChatGPT to provide accurate and reliable results'),
//        (7, 7, 'ChatGPT is the future', 'ChatGPT is the future of language processing and understanding. It has so much potential for various industries'),
//        (8, 8, 'ChatGPT is a must-have tool', 'If you havent tried ChatGPT yet, you are missing out. It is a must-have tool for anyone working with language data'),
//        (9, 9, 'ChatGPT is intuitive', 'I love how intuitive ChatGPT is to use. It takes very little time to learn and start using it effectively'),
//        (10, 10, 'ChatGPT is versatile', 'One of the things I love most about ChatGPT is its versatility. It can be used for so many different tasks and applications'),
//        (1, 11, 'ChatGPT is fantastic', 'I have been using ChatGPT for a while now and I have to say it is fantastic. It is able to generate high-quality text that is indistinguishable from human-written content'),
//        (2, 12, 'ChatGPT is a game-changer', 'ChatGPT has completely changed how I work. It has improved my productivity and efficiency'),
//        (3, 13, 'ChatGPT is the future', 'ChatGPT is the future of language processing and understanding. It has so much potential for various industries'),
//        (4, 14, 'ChatGPT is a lifesaver', 'I dont know what I would do without ChatGPT. It has helped me with so many tasks and saved me so much time'),
//        (5, 15, 'ChatGPT is reliable', 'I can always count on ChatGPT to provide accurate and reliable results'),
//        (6, 16, 'ChatGPT is intuitive', 'I love how intuitive ChatGPT is to use. It takes very little time to learn and start using it effectively'),
//        (7, 17, 'ChatGPT is versatile', 'One of the things I love most about ChatGPT is its versatility. It can be used for so many different tasks and applications'),
//        (8, 18, 'ChatGPT is impressive', 'I am constantly impressed by the capabilities of ChatGPT.');

//INSERT COMMENTS

// INSERT INTO comments (PostId, id, name, email, body)
// VALUES (1, 1, 'John Smith', 'jsmith@example.com', 'I am worried that ChatGPT will take over my job. It can do so many things that I do, and it does them faster and more efficiently'),
//        (2, 2, 'Jane Doe', 'jdoe@example.com', 'I am concerned that ChatGPT will make my job obsolete. It can perform many of my tasks with greater accuracy and speed'),
//        (3, 3, 'Bob Johnson', 'bjohnson@example.com', 'I am afraid that ChatGPT will replace me. It can do so much and it never makes mistakes'),
//        (4, 4, 'Samantha Williams', 'swilliams@example.com', 'I am scared that ChatGPT will take over my position. It can do everything I do and more'),
//        (5, 5, 'Michael Brown', 'mbrown@example.com', 'I am worried that ChatGPT will automate my job. It can handle many tasks that I am responsible for with ease'),
//        (6, 6, 'Emily Davis', 'edavis@example.com', 'I am concerned that ChatGPT will render my job unnecessary. It can complete many tasks more effectively and quickly than I can'),
//        (7, 7, 'Matthew Miller', 'mmiller@example.com', 'I am afraid that ChatGPT will make me redundant. It can do so much and it never takes a break'),
//        (8, 8, 'Jacob Garcia', 'jgarcia@example.com', 'I am scared that ChatGPT will put me out of a job. It can do everything I do and more'),
//        (9, 9, 'Nicholas Rodriguez', 'nrodriguez@example.com', 'I am worried that ChatGPT will automate my role. It can handle many tasks that I am responsible for with ease'),
//        (10, 10, 'Anthony Hernandez', 'ahernandez@example.com', 'I am concerned that ChatGPT will render my role unnecessary. It can complete many tasks more effectively and quickly than I can'),
//        (11, 11, 'Ashley Moore', 'amoore@example.com', 'I am afraid that ChatGPT will make me redundant. It can do so much and it never takes a break'),
//        (12, 12, 'Sarah Anderson', 'sanderson@example.com', 'I am scared that ChatGPT will put me out of a job. It can do everything I do and more'),
//        (13, 13, 'Justin Thomas', 'jthomas@example.com', 'I am worried that ChatGPT will automate my role. It can handle many tasks that I am responsible for with ease'),
//        (14, 14, 'Bryan Hernandez', 'bhernandez@example.com', 'I am concerned that ChatGPT will render my role unnecessary. It can complete many tasks more effectively and quickly than I can'),
//        (15, 15, 'Ryan Moore', 'rmoore@example.com', 'I am afraid that ChatGPT will make me redundant. It can do so much and it never takes a break'),
//        (16, 16, 'John Smith', 'jsmith@example.com', 'I am scared');
// INSERT INTO comments (PostId, name, email, body)
// VALUES (1, 'John', 'john@example.com', 'ChatGPT is an impressive language model.'),
//        (2, 'Jane', 'jane@example.com', 'I find ChatGPT to be very accurate and efficient.'),
//        (3, 'Bob', 'bob@example.com', 'ChatGPT has saved me a lot of time in my work.'),
//        (4, 'Amy', 'amy@example.com', 'I am amazed by the natural language understanding of ChatGPT.'),
//        (5, 'Mike', 'mike@example.com', 'ChatGPT is a game changer for the field of NLP.'),
//        (6, 'Sara', 'sara@example.com', 'I have been using ChatGPT for multiple projects and it has never let me down.'),
//        (7, 'Tom', 'tom@example.com', 'ChatGPT is an extremely powerful tool for text generation.'),
//        (8, 'Emily', 'emily@example.com', 'I am impressed by the speed at which ChatGPT generates text.'),
//        (9, 'David', 'david@example.com', 'ChatGPT has greatly improved the quality of my chatbot.'),
//        (10, 'Jessica', 'jessica@example.com', 'ChatGPT is a valuable asset for anyone working in NLP.'),
//        (11, 'Mark', 'mark@example.com', 'ChatGPT is a powerful tool for text summarization.'),
//        (12, 'Lauren', 'lauren@example.com', 'I have found ChatGPT to be very useful for language translation.'),
//        (13, 'Chris', 'chris@example.com', 'ChatGPT is a state-of-the-art language model.'),
//        (14, 'Megan', 'megan@example.com', 'ChatGPT has helped me improve my language understanding.'),
//        (15, 'Adam', 'adam@example.com', 'ChatGPT is an incredible tool for text completion.'),
//        (16, 'Rachel', 'rachel@example.com', 'ChatGPT is a versatile language model that can be used for a wide range of tasks.');
// INSERT INTO comments(PostId, name, email, body)
// VALUES
//   (16, 'Yair', 'yair@example.com', 'ChatGPT efficiency is impressive, it generates text in a matter of seconds.'),
//   (17, 'Ori', 'ori@example.com', 'I find ChatGPT efficiency to be top-notch, it can handle large amounts of text with ease.'),
//   (18, 'Noa', 'noa@example.com', 'ChatGPT efficiency has greatly improved my productivity in my work.'),
//     (1, 'Yair', 'yair@example.com', 'ChatGPT efficiency is impressive, it generates text in a matter of seconds.'),
//   (2, 'Ori', 'ori@example.com', 'I find ChatGPT efficiency to be top-notch, it can handle large amounts of text with ease.'),
//   (3, 'Noa', 'noa@example.com', 'ChatGPT efficiency has greatly improved my productivity in my work.'),
//   (4, 'Eytan', 'eytan@example.com', 'ChatGPT efficiency is outstanding, it can generate high-quality text in a short amount of time.'),
//   (5, 'Shai', 'shai@example.com', 'ChatGPT efficiency makes natural language processing tasks effortless.'),
//   (6, 'Nimrod', 'nimrod@example.com', 'I have been using ChatGPT for multiple projects and its efficiency has never disappointed me.'),
//   (7, 'Lior', 'lior@example.com', 'ChatGPT efficiency is a game changer for my business, it has helped me automate repetitive tasks.'),
//   (8, 'Ran', 'ran@example.com', 'ChatGPT efficiency has greatly improved the speed and accuracy of my text generation tasks.'),
//   (9, 'Aviv', 'aviv@example.com', 'ChatGPT efficiency has helped me generate more realistic and natural text for my chatbot.'),
//   (10, 'Yotam', 'yotam@example.com', 'ChatGPT efficiency is a valuable asset for anyone working in natural language processing.'),
//   (11, 'Tal', 'tal@example.com', 'ChatGPT efficiency makes text summarization a breeze.'),
//   (12, 'Yael', 'yael@example.com', 'I have found ChatGPT efficiency to be very useful for language translation tasks.'),
//   (13, 'Shimon', 'shimon@example.com', 'ChatGPT efficiency is a state-of-the-art language model.'),
//   (14, 'Dana', 'dana@example.com', 'ChatGPT efficiency has helped me improve my language understanding.'),
//   (15, 'Itai', 'itai@example.com', 'ChatGPT efficiency is an incredible tool for text completion.'),
//   (16, 'Rachel', 'rachel@example.com', 'ChatGPT efficiency is a versatile language model that can be used for a wide range of tasks.'),
//   (17, 'Shlomi', 'shlomi@example.com', 'ChatGPT efficiency has significantly reduced the time and effort required for text generation tasks.'),
//   (18, 'Yonatan', 'yonatan@example.com', 'ChatGPT efficiency is a powerful tool that allows me to generate high-quality text with minimal effort.');

//INSERT PASSWORDS

// INSERT INTO passwords (userId, password)
// VALUES (1, 'password1'),
//        (2, 'password2'),
//        (3, 'password3'),
//        (4, 'password4'),
//        (5, 'password5'),
//        (6, 'password6'),
//        (7, 'password7'),
//        (8, 'password8'),
//        (9, 'password9'),
//        (10, 'password10');