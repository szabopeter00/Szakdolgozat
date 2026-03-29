# 3D Scrollytelling Webalkalmazás – Prémium Termékbemutató

> **Szakdolgozati Projekt**  
> Készítette: Szabó Péter  
> Egyetem, egyetemi kar, szak: Szegedi Tudományegyetem, Természettudományi És Informatikai Kar – Programtervező informatikus BSc  
> Témavezető: Kicsi András Dr.  
> Év: 2026  
> Megtekintés: https://szakdolgozat-rho.vercel.app/
> Statikus verzió megtekintése: LINK

## A projektről

Ez a webalkalmazás a szakdolgozatom gyakorlati megvalósítása, amelynek célja a **narratív 3D adatvizualizáció (scrollytelling)** hatékonyságának vizsgálata az e-kereskedelemben. Az alkalmazás egy prémium fejhallgató interaktív, görgetés-vezérelt bemutatását valósítja meg, zökkenőmentesen ötvözve a webes ergonómiát a hardveresen gyorsított WebGL grafikával.

A fejlesztés során kiemelt fókuszt kapott a reszponzivitás, az aszinkron adatbetöltés, valamint a modern webes metrikák (Google Core Web Vitals) optimalizálása.

## Alkalmazott Technológiák

- **Keretrendszer:** React.js (Vite környezetben)
- **3D Motor:** Three.js & React Three Fiber (R3F)
- **Segédkönyvtárak:** `@react-three/drei` (kamera és környezet beállítások)
- **Állapotkezelés:** Zustand
- **Tömörítés:** Google Draco (glTF 2.0 formátum)
- **Stílusozás:** Tiszta CSS3 (Reszponzív, Mobile-First megközelítés)

## Telepítés és Futtatás helyileg

Az alkalmazás futtatásához [Node.js](https://nodejs.org/) környezet szükséges.

- **A kód klónozása és futtatása**
  ```bash
  git clone https://github.com/szabopeter00/Szakdolgozat.git
  cd szakdolgozat-3d
  npm install
  npm run dev
  ```

Ezt követően az alkalmazás elérhetővé válik a böngészőben, jellemzően a http://localhost:5173/ címen.

## Főbb funkciók

- **Eseményvezérelt animációk (Scrollytelling):** A 3D modell térbeli pozíciója, a kamera nézőpontja és a "robbantott ábra" animációk a felhasználó görgetési pozíciójához vannak szinkronizálva, lineáris interpoláció (Lerp) segítségével.
- **Interaktív termékkonfigurátor:** Valós idejű, procedurális anyag- és színmódosítás a felhasználói felületen keresztül, globális állapotkezeléssel.
- **Hardverfüggetlen interakció:** Normalizált, képernyőszélesség-alapú forgatási matematika, amely garantálja az azonos érzékenységet asztali (egér) és mobil (érintőképernyő) eszközökön egyaránt.
- **Kódarchitektúra:** A 3D színtér renderelése és az üzleti logika élesen el van választva. Az eseménykezelők és az anyagmanipulációk egyedi React Hook-okba (`useInteractiveRotation`, `useModelMaterials`) lettek kiszervezve a Clean Code elvek mentén.
- **Teljesítmény-optimalizálás (Draco):** A 3D modell hálózati terhelése a Google Draco geometria-tömörítési algoritmusával az eredeti töredékére csökkent.

## A kutatás háttere

A szakdolgozati kutatás részeként a webalkalmazás felhasználói élménye egy kiterjedt A/B tesztelés során került összehasonlításra egy hagyományos, statikus weboldallal. A kutatás célja annak igazolása, hogy a narratív 3D vizualizáció, bár komplexebb technológiai hátteret igényel, szignifikánsan növeli-e a termékmegértést és a prémium érzetet a különböző korosztályok és eszközhasználók körében.

## A 3D modell alapjának forrása

A projektben felhasznált 3D modell a Sketchfab platformról származik, módosításait (textúrák, tömörítés, anyagok paraméterezése) jómagam végeztem az alábbi licenszfeltételek tiszteletben tartásával:

> **Model:** [red headphones](https://sketchfab.com/3d-models/red-headphones-de5eaf98b8c34c43bc8bfbd7298f3ce0)  
> **Author:** [MeiU Studio](https://sketchfab.com/syeon800)  
> **License:** CC-BY-NC-4.0 (Author must be credited. No commercial use.)

## Kapcsolat

> Szerző: Szabó Péter  
> Email: szabopeter0426@gmail.com

Ez a projekt kizárólag oktatási és kutatási célt szolgál a Szegedi Tudományegyetem szakdolgozati követelményeinek teljesítése érdekében.
