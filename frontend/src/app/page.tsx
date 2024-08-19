import { HeroSection } from "@/components/custom/HeroSection";
import { flattenAttributes } from "@/lib/utils";
import qs from "qs"

const homePageQuery =qs.stringify({
    populate: {
      blocks: {
        populate: {
          image: {
            fields: ["url", "alternativeText"]
          },
          link: {
            populate: true
          }
        }
      }
    }
});
 async function getStrapiData(path : string) {
  const baseUrl = "http://localhost:1337";
  const url = new URL(path,baseUrl);
  url.search = homePageQuery;
  
  try {
    const res = await fetch(url.href, {cache:"no-store"});
    const data = await res.json();
    const flattenedData = flattenAttributes(data);
    return flattenedData;
  } catch (error) {
   console.log(error) 
  }
 
}
export default async function Home() {
 const strapiData = await getStrapiData("/api/home-page")

 const {title, description,blocks}= strapiData;
  return (
   <main >
<HeroSection data={blocks[0]}/>
   </main>
  );
}
