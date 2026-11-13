import "./style.css";

interface idp{
    id:number,
    titre:string,
    montant:number,
    categorie:string
}

const form = document.getElementById("form-depense") as HTMLFormElement
const ti = document.getElementById("titre") as HTMLInputElement
const mon = document.getElementById("montant")as HTMLInputElement
const car = document.getElementById("categorie")as HTMLSelectElement
const filt = document.getElementById("filtre") as HTMLSelectElement
const list = document.getElementById("liste-depenses")as HTMLDivElement
const totale = document.getElementById("total")as HTMLParagraphElement

let dp:idp[]=[];

function sauvegarder():void{

    localStorage.setItem("dp", JSON.stringify(dp));
}

function edp(event:SubmitEvent):void{
         
      event.preventDefault();

      const titre=ti.value.trim();
      const montant=Number(mon.value);
      const categorie=car.value.trim();

    if(titre ==="" || montant <=0  || !Number.isFinite(montant) || categorie ==="" ){

        alert("veuillez remplir tous les champs correctement")
        return
    }

  const npd:idp={
    id:Date.now(),
    titre:titre,
    montant:montant,
    categorie:categorie
  }

  dp.push(npd)
  sauvegarder()
  form.reset();
  afdp();
  

}

function afdp():void{

  list.innerHTML=""

  const fchoix=filt.value

 const choix = dp.filter((depense)=>{

   return fchoix ==="Toutes" || 
   depense.categorie === fchoix

 })

 if(choix.length===0){

  const i = document.createElement("p")
  i.className="vide"
  i.textContent="ancun depense actuellement"
  list.appendChild(i);
 }

choix.forEach((depenses)=>{
 const pd = document.createElement("div")
 pd.className="afd"

 const inf = document.createElement("div")
 inf.className="dinfo"

 const at = document.createElement("h3")
 at.className="at"
 at.textContent=depenses.titre;

const ac = document.createElement("p")
ac.className="ac"
ac.textContent=depenses.categorie;

inf.append(at,ac)

const mon = document.createElement("p")
mon.className="montant"
mon.textContent=depenses.montant.toLocaleString("fr-FR")+"CFA"

const button = document.createElement("button")
button.className="button"
button.textContent="supprimer"
button.addEventListener("click",()=>{
    sdepnse(depenses.id)

})
pd.append(inf,mon,button)
list.appendChild(pd)

})



totad(choix);

}

function sdepnse(id:number):void{

  dp=dp.filter((ense)=>{

    return ense.id !==id
  })
  afdp()
  sauvegarder()

}

function totad (total:idp[]):void{
   let to=0;
  for(let i=0; i<total.length;i++) {

    to=to+total[i].montant
  }
   totale.textContent=to.toLocaleString("fr-FR")+"CFA"

}

function charger(): void {

    const donnees = localStorage.getItem("dp");

    if (donnees !== null) {
        dp = JSON.parse(donnees);
    }

    afdp();
}

form.addEventListener("submit",edp)
filt.addEventListener("change",afdp)
charger();