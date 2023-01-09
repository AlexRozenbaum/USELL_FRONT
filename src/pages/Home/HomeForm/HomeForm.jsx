import { FormControl } from "@mui/material";
import React, { useEffect, useState } from "react";
import SearchBar from "../../../components/SearchSortPage/SearchBar/SearchBar";
import { observer } from "mobx-react";
import ItemsList from "../../../components/Items/ItemsList";
import { API_URL } from "../../../utils/constants/url.constants";
import { doApiGet } from "../../../services/ApiService/ApiService";
import Loading from "../../../components/Loading/Loading";
import PerPage from "../../../components/SearchSortPage/PerPage/PerPage";
import ByCategory from "../../../components/SearchSortPage/ByCategory/ByCategory";

function HomeForm() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [countPages,setcountPages] = useState(1);
  const [currentPage,setcurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [perPage, setPerPage] = useState(10);
  const [category, setCategory] = useState("ALL");
  useEffect(() => {
      doApi();
      console.log("mounted Home");
    return () => console.log("unmounting..Home");
  }, [currentPage,category,searchQuery,perPage]);
  const doApi = async () => {
    console.log("getting data");
    try {
      let url = API_URL.concat(
        "/lots/",
        "?&&s=",
        searchQuery,
        "&&category=",
        category,
        "&&page=",
        currentPage,
        "&&perPage=",
        perPage,  
      );
      console.log(url)
      let resp = await doApiGet(url);
      const totalPages = Math.ceil(resp.data.count/perPage);
      setcountPages(totalPages);
      setItems(resp.data.items);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };
  return (
    <div><>
    {isLoading?<Loading/>:<>
                <SearchBar setSearchQuery={setSearchQuery} />
                 <FormControl>
                  <ByCategory category={category} setCategory={setCategory}/>
                  </FormControl>
                  <FormControl>
                  <PerPage perPage={perPage} setPerPage={setPerPage}/>
              </FormControl>
            <ItemsList  items={items} countPages={countPages} currentPage={currentPage} setcurrentPage={setcurrentPage}/>
            </>}</></div>
  );
}
export default observer(HomeForm);
