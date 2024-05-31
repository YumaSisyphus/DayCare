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



 


