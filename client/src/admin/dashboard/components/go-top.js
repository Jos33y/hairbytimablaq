import { useEffect} from "react";

export default function HandleScroll() {


  useEffect(() => {
    document.getElementById('category-container').scrollIntoView({ behavior: 'smooth', block: "start"});
    document.getElementById('category-container').style.paddingTop = "90px";

  }, []);

  return null;
} 