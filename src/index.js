// import
import { heroesQuery } from "./query/heroes.js";

// config
import { STRATZ_HERO_URL } from "./config.js";

// constants
import { PRIMARY_ATTR_LIST } from "./constants.js";

// pipe
import { getGraphqlData, formatText } from "./utils.js";

// images
import heroAgility from "../images/hero_agility.png";
import heroStrength from "../images/hero_strength.png";
import heroIntelligence from "../images/hero_intelligence.png";

// inti state
let heroesData;

// dom list
const heroListNode = document.getElementsByClassName("hero-list")[0];
const heroCards = document.getElementsByClassName("heroes-card");

// main()
const main = async () => {
  heroesData = await getGraphqlData(heroesQuery());
  // set data to hero list node
  heroListNode.innerHTML = `
    ${filterHeroesBasePrimaryAttr(heroesData.data.constants.heroes, "str")}
    ${filterHeroesBasePrimaryAttr(heroesData.data.constants.heroes, "agi")}
    ${filterHeroesBasePrimaryAttr(heroesData.data.constants.heroes, "int")}
  `;
};

main();

/**
 * Filter Hero base primary attribute
 * @param {Array} heroes - All heroes data
 * @param {String} primaryAttribute - Hero primary attribute
 * @returns {String} HTML template string
 */

const filterHeroesBasePrimaryAttr = (heroes, primaryAttribute) => {
  heroes = heroes.filter(
    (hero) => hero["stats"]["primaryAttribute"] === primaryAttribute
  );
  const list = document.createElement("div");
  list.classList.add("list");
  // heroListNode
  for (let hero of heroes) {
    const heroNode = document.createElement("div");
    const heroImgNode = document.createElement("img");
    heroImgNode.setAttribute(
      "src",
      `${STRATZ_HERO_URL}/${hero.shortName}_vert.png`
    );
    heroImgNode.setAttribute("loading", "lazy");
    heroImgNode.setAttribute("data-hero-id", hero.id);
    heroNode.classList.add("heroes-card");
    heroNode.setAttribute("data-complexity-value", hero["stats"]["complexity"]);
    heroNode.append(heroImgNode);
    list.appendChild(heroNode);
  }

  let pA = "";
  if (PRIMARY_ATTR_LIST[primaryAttribute] === "hero_agility") {
    pA = heroAgility;
  } else if (PRIMARY_ATTR_LIST[primaryAttribute] === "hero_strength") {
    pA = heroStrength;
  } else {
    pA = heroIntelligence;
  }

  return `
   <div class="hero-list-${PRIMARY_ATTR_LIST[primaryAttribute]}">
    <h2 class="hero-list-heading">
      <img src="${pA}" />
      ${formatText(PRIMARY_ATTR_LIST[primaryAttribute], "_", 1)}
    </h2>
    ${list.innerHTML}
   </div>
   `;
};

/* hero complexity filter bar */
const complexityNode = document.getElementsByClassName("complexity");
// conver the HTMLCollection to array
const complexities = Array.prototype.slice.call(complexityNode);
complexities.forEach((complexity, index, arr) => {
  complexity.addEventListener("click", (e) => {
    const st = e.target.getAttribute("data-selected");
    // reset all data-select and reset all actived
    arr.map((i) => {
      i.setAttribute("data-selected", "false");
      i.classList.remove("filter-actived");
    });
    // previous item will add actived class
    const activeds = arr.slice(0, index + 1);
    activeds.map((a) => a.classList.add("filter-actived"));
    e.target.setAttribute("data-selected", st === "false" ? "true" : "false");

    // after e.target is true, we need to reset if click again
    if (st === "true") {
      arr.map((i) => {
        i.setAttribute("data-selected", "false");
        i.classList.remove("filter-actived");
      });
    }

    // logic when we click the complxity diamond filter heroes list
    for (let heroCard of heroCards) {
      if (
        heroCard.getAttribute("data-complexity-value") !==
          e.target.getAttribute("data-complexity-value") &&
        st === "false"
      ) {
        heroCard.classList.add("grey-out");
      } else {
        heroCard.classList.remove("grey-out");
      }
    }
  });
});
/* heroes list */
