 <h1> LET CENTER -DayCare   </h1>
 <img src= "https://github.com/YumaSisyphus/DayCare/assets/119975261/5814b938-edf2-4a6b-a4d2-81be202c791a">

 <p>Aplikacion per menaxhimin e qendrimit ditore per femijet.</p>

 <p>Ky projekt eshte i punuar per lenden laboratike 2, ne kuader te universitetit.</p>
 <h3>Projekti eshte punuar ne grup nga studentet : </h3>
 <ol>
   <li>Dea Fetahu</li>
   <li>Erblin Ymeri</li>
   <li>Butrint Reqica</li>
   <li>Elsa Tomaj</li>
   <li>Marjeta Ramaj</li>
 </ol>
 <h3>Teknologjite e perdorura ne kete projekt jane:</h3>

 <ul>
   <li>Backend - Express.js</li>
   <li>Frontend - React JS </li>
   <li>SQL Database - MySQL</li>
   <li>NOSQL Database - MongoDB</li>
 </ul>

 <h2>Funksionalitet i projektit perfshin:</h2>

 <ol>
   <li>Autentikimi dhe autorizimi
   <p>Autentikimi eshte implementuar duke perdorur JSON Web Tokens. Serveri gjeneron nje JWT access token dhe refresh token(JWTs). Access token dergohet ne pjesen e klientit duke perdorur cookies. Pasi qe te autentikohet nje user, ai autorizohet neper faqe te aplikacionit permes rolit qe ka ne token. Gjithashtu perdoret bcrypt për të krahasuar fjalëkalimin e dhënë nga përdoruesi me fjalëkalimin e ruajtur në bazën e të dhënave përkatëse  </p> </li>
   <li>Roles dhe Siguria
   <p>Aplikacioni ka 2 lloje te users: staf dhe parent. Ne kuader te stafit hyjne dy role qe jane Teacher dhe Admin. Ne baze te rolit qe ka useri te ruajtur ne token, ai ka akses neper funksionalitete te ndryshme te aplikacionit e cila menaxhohet permes Routing ne React. .</p>
   </li>
   <li> Menyra e menaxhimit te femijeve
     <p>Femijet ne aplikacion shtohen permes adminit i cili ka akses ne krijimin dhe editimin e tyre. Femijet nuk mund te behen login por ne profilet e tyre kane qasje prinderit qe jane assigned tek femija perkates</p>
   </li>
   <li> Menyra e menaxhimit te detyrave te stafit
     <p>Pjesa e stafit ndahet ne dy role qe jane: Teacher dhe Admin. Teacher ka funksionalitet ne dashboard te cilat perfshijne: shfaqjen e klasave perkatese, shfaqjen e ushqimeve dhe vakteve ushqimore si dhe editimin apo shtimin e tyre, ka akses ne listen e femijeve te cilet jane ne klaset e Teacher-it dhe aty mund ti bej mark per present ose jo present dhe gjithashtu mund qe te krijoje raporte per secilin nxenes. Sa i perket pjeses se Admin, ai ka aksese ne te gjitha funksionalitetet e faqes si krijimin, shtimin dhe fshirjen e Teachers, Parents, Childrens, Contact forms, ka akses ne listen e pagesave etj </p>
   </li>
   <li> Food, Meals and Activity
     <p>Teachers kane qasje ne pjesen e meaxhimit te shujtave ditore per femije, si dhe aktivitetet qe do mbahen gjate vitit shkollor. Ata mund te shtojne aktivitete apo ushqime te cilat jane te qasshem ne listen e Meals, Food dhe Activity.</p>
   </li>
    <li> Menyra e menaxhimit te Parent profile
     <p>Profili i parent eshte i krijuar ne menyre qe te mund te shoh te dhenat e femijes se tij. Pershembull ai ne profilin e tij mund te shoh child profile ku aty gjenden edhe fatura e pagesave te kopshtit, mund te shoh raportet nga mesusja, mund te kontaktoj me Teacher apo Admin, mund te kryeje pagesen e kopshtit online.</p>
   </li>
   <li> Implementimi i funksionalitetit te pageses
     <p>Pagesat ne sistem jane implementuar ne dy menyra, ne ate online dhe cash. Pagesa online eshte implementuar me ane te Stripe. Ne kryerjen e pageses online apo cash, shuma e parave te paguara automatikisht minusohet nga profili i femijes per te cilin eshte paguar shuma perkatese.</p>
   </li>
   <li> Implementimi i funksionalitetit te online chat
     <p>Frontend dhe backend komunikojne permes HTTP requests dhe WebSocket connections (per real-time messaging duke perdorur Socket.io) Te dhenat ne kete online chat ruhen ne MySQL. Secili user ne platforme mundet me u qase ne kete chat dhe te komunikoje. </p>
   </li>
   <li> Implementimi i search filters, sort filter dhe pagination
     <p>Ne secilen faqe te aplikacionit eshte ofruar mundesia e filtrimit dhe sortimit te te dhenave per nje qasje me te lehte dhe me te shpejte ne to. Si dhe ne secilen dashboard eshte implementuar logjika e pagination.</p>
   </li>
 </ol>
 <h3>Home Page</h3>
 <img src="https://github.com/YumaSisyphus/DayCare/assets/119975261/5ba09691-75c6-4230-babf-135b57befd77">
 
 <h3>Dashboards</h3>
 <img src="https://github.com/YumaSisyphus/DayCare/assets/119975261/e79ff16e-6354-4839-b86e-f26c14adbab3">

<h3>A closer look on search and filtering mechanism</h3>
<img src="https://github.com/YumaSisyphus/DayCare/assets/119975261/3807e7a1-24f3-4cd2-abbb-bcaea2f22cb4">

<h3>Forms </h3>
<img src="https://github.com/YumaSisyphus/DayCare/assets/119975261/87f519ed-4afe-4712-bf0f-e61637232d00">

<h3>Make Cache Payments</h3>
<img src="https://github.com/YumaSisyphus/DayCare/assets/119975261/6a38a7fb-6188-4c03-93ee-4cad7f09559b">

<h3>Make Online Payments</h3>
<img src="https://github.com/YumaSisyphus/DayCare/assets/119975261/9891257a-be4e-4837-80e0-df3040143de5">

 <h3>Payments on Stripe</h3>
<img src="https://github.com/YumaSisyphus/DayCare/assets/119975261/23eaf29d-a2e1-447d-9599-67f4f272d9dc">

<h3>Invoices</h3>
<img src="https://github.com/YumaSisyphus/DayCare/assets/119975261/1e439eb2-2aa4-4a2b-8f39-6d736c725a0a">


<h3>Online Chat Interface</h3>
<img src="https://github.com/YumaSisyphus/DayCare/assets/119975261/7288ca6e-9fd1-4e2b-8d71-d61d62cb83ca">

<h3>Instruksionet per instalim</h3>
<ul>
<li><b>Node.js</b> (version 14.x or higher)</li>
<li><b>MySQL</b> (version 8.x or higher)</li>
<li><b>MongoDB</b> (version 4.x or higher)</li>
<li><b>Stripe account</b> for online payments</li>
 </ul>
<h3>Setup</h3>
<ol>
 <li>Clone the repository:
 <p>git clone https://github.com/YumaSisyphus/DayCare.git <br>
     cd DayCare</p></li>
 <li>Install backend dependencies:
 <p>cd server <br>
npm install
</p></li>
 <li>Install frontend dependencies:
  <p>cd ../client <br>
npm install
</p>
 </li>
 <li>Configure environment variables:
<p>Create a .env file in the server directory and add the necessary environment variables (e.g., database connection strings, JWT secret, Stripe API keys).
</p>
</li>
 <li>Run the backend server:
 cd server <br>
npm start
</li>
 <li>Run the frontend development server:
 <p>cd ../client <br>
npm start
</p></li>
 <li>Access the application in your browser at http://localhost:3000.
</li>
</ol>

<p>Pasi te perfundohen keta hapa, nevojitet krijimi i nje account per t'u bere log in.<br> <br> Shkoni ne MySQL dhe ekzekutoni komanden ne vazhdim per krijimin e nje admini. Pastaj ne admin dashboard jane te gjitha funksionet e nevojshme per krijimin e user-eve te tjere !</p>

<h3>Komanda qe do ekzekutohet ne MySQL :</h3>

<p>insert into daycare.staff (Name, Surname, Birthday, Gender, Email, PhoneNumber, Role, Username, Address, Password)
 VALUES('test','testtest','2015-02-20','Fe','test@gmail','678686','Admin','admin','address','$2b$10$.2zl2lTl6yS1oMH9q0Whk.qsTwhezW1HAA/NTLgNRTqpFgo4ErSzS')</h4>
 <br>
 <h3>IMPORTANT !</p>
 <p>Log in behet permes username dhe password dmth. <b> Username: admin, Password: a</b></p>


