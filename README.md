 <h1> LET CENTER -DayCare   </h1>
 <img src= ""
 <p>Aplikacion per menaxhimin e qendrimit ditor per femijet.</p>

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
   <li>Frontend - React js </li>
   <li>SQL Database - MySQL</li>
   <li>NOSQL Database - MongoDB</li>
 </ul>

 <h2>Funksionalitet i projektit perfshin:</h2>

 <ol>
   <li>Autentifikimi dhe autorizimi
   <p>Autentikimi eshte implementuar duke perdorur JSON Web Tokens. Serveri gjeneron nje JWT access token dhe refresh token(JWTs). Access token dergohet ne pjesen e klientit duke perdorur cookies. Pasi qe te autentikohet nje user, ai autorizohet neper faqe te aplikacionit permes rolit qe ka ne token. Gjithashtu perdoret bcrypt për të krahasuar fjalëkalimin e dhënë nga përdoruesi me fjalëkalimin e ruajtur në bazën e të dhënave përkatëse  </p> </li>
   <li>Roles dhe Siguria
   <p>Aplikacioni kga 2 lloje te users: staf dhe parent. Ne kuader te stafit hyjne dy role qe jane Teacher dhe Admin. Ne baze te rolit qe ka useri te ruajtur ne token, ai ka akses neper funksionalitete te ndryshme te aplikacionit e cila menagjohet permes Routing ne React. .</p>
   </li>
   <li> Menyra e menaxhimit te femijeve
     <p>Femijet ne aplikacion shtohen permes admin i cili ka akses ne krijimin dhe editimin e tyre. Femijet nuk mund te behen login por ne profilet e tyre kane qasje prinderit qe jane assigned tek femija perkates</p>
   </li>
   <li> Menyra e menaxhimit te detyrave te staff
     <p>Pjesa e stafit ndahet ne dy role qe jane: Teacher dhe Admin. Teacher ka funksionalitet ne dashboard te cilat perfshijne: shfaqjen e klasave perkatese, shfaqjen e ushqimeve dhe vakteve ushqimore si dhe editimin apo shtimin e tyre, ka akses ne listen e femijeve te cilet jane ne klaset e Teacher dhe aty mund ti bej mark per present ose jo present dhe gjithashtu mund qe te krijoje raporte per secilin nxenes. Sa i perket pjeses se Admin, ai ka aksese ne te gjitha funksionalitetet e faqes si krijimin, shtimin dhe fshirjen e Teachers, Parents, Childrens, Food, Meals, Messages dhe ka akses ne listen e pagesave etj </p>
   </li>
   <li> Food, Meals and Activity
     <p>Teachers dhe Admin kane qasje ne pjesen e meaxhimit te shujtave ditore per femije, si dhe aktivitetet qe do mbahen gjate vitit shkollor. Ata mund te shtojne aktivitete apo ushqime te cilat jane te qasshem ne listen e Meals, Food dhe Activity</p>
   </li>
    <li> Menyra e menaxhimit te Parent profile
     <p>Profili i parent eshte i krijuar ne menyre qe te mund te shoh te dhenat e femijes se tij. Psh ai ne profilin e tij mund te shoh child profile ku aty gjenden edhe fatura e pagesave te kopshtit, mund te shoh raportet nga mesusja, mund te kontaktoj me Teacher apo Admin, mund te kryeje pagesen e kopshtit online.</p>
   </li>
   <li> Implementimi i funksionalitetit te pageses
     <p>Pagesat ne sistem jane implementuar ne dy menyra, ne ate online dhe cash. Pagesa online eshte implementuar me ane te stripe. Ne kryerjen e pageses online apo cash, shuma e parave te paguara automatikisht minusohet nga profili i femijes per te cilin eshte paguar shuma perkatese</p>
   </li>
   <li> Implementimi i funksionalitetit te online chat
     <p>Frontend dhe backend komunikojne permes HTTP requests dhe WebSocket connections (per real-time messaging duke perdorur Socket.io) Te dhenat ne kete online chat ruhen ne MySQL. Secili user ne platforme mundet me u qase ne kete chat dhe te komunikoje </p>
   </li>
   <li> Implementimi i search filters, sort filter dhe pagination
     <p>Ne secilen faqe te aplikacionit eshte ofruar mundesia e filtrimit dhe sortimit te te dhenave per nje qasje me te lehte dhe me te shpejte ne to. Si dhe ne secilen faqe eshte implementuar logjika e pagination</p>
   </li>
 </ol>
<h3>Online Chat Interface</h3>
<img src="https://github.com/YumaSisyphus/DayCare/assets/120139227/676cce9e-3fc5-45b7-bc5a-71479843cd3d">


 


