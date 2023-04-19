import { heroQuery } from "./query/hero.js";
import { rolesQuery } from "./query/roles.js";
import { abilitiesQuery } from "./query/abilities.js";

// image
import heroAgility from "../images/hero_agility.png";
import heroStrength from "../images/hero_strength.png";
import heroIntelligence from "../images/hero_intelligence.png";
import melee from "../images/melee.svg";
import ranged from "../images/ranged.svg";
import aghsScepter from "../images/aghs_scepter.png";
import aghs1scepter1 from "../images/aghs_1_scepter_1.png";
import aghs0scepter0 from "../images/aghs_0_scepter_0.png";
import aghs1scepter0 from "../images/aghs_1_scepter_0.png";
import aghs0scepter1 from "../images/aghs_0_scepter_1.png";

import scepter0 from "../images/scepter_0.png";
import scepter1 from "../images/scepter_1.png";

import shard0 from "../images/shard_0.png";
import shard1 from "../images/shard_1.png";

import cooldownIcon from "../images/cooldown.png";

// constants
import {
  PRIMARY_ATTR_LIST,
  IMG_ONERROR,
  BASE_HEALTH,
  HP_UNIT,
  BOUNUS_HEALTH_REGENERATION,
  BASE_MANA,
  MP_UNIT,
  BOUNUS_MANA_REGENERATION,
  DAMAGE_TYPE,
  DOTA_UNIT_TARGET_TEAM,
  SPELL_IMMUNITY_LIST,
} from "./constants.js";

import { STRATZ_ABILITIE_URL, VIDEO_URL } from "./config.js";

// pipe
import { getGraphqlData, formatText } from "./utils.js";

// init state
let heroId = 1;
let heroData;
let rolesData;
let abilitiesData;

// Dom list
const heroCardNode = document.getElementsByClassName("hero-card")[0];
const heroCardFrontNode = document.getElementsByClassName("hero-card-front")[0];
const heroCards = document.getElementsByClassName("heroes-card");

// hero primary att
const heroPrimaryAttrNode = document.createElement("div");
heroPrimaryAttrNode.classList.add("hero-primary_attr");
heroCardFrontNode.appendChild(heroPrimaryAttrNode);
const heroPrimaryAttrDom = document.createElement("img");
heroPrimaryAttrNode.appendChild(heroPrimaryAttrDom);
// before the card flip, won't show the node
heroPrimaryAttrNode.style.display = "none";

// hero attack type
// it's similar with primary att show right top corner
const heroAttackTypeNode = document.createElement("div");
heroAttackTypeNode.classList.add("hero-attack_type");
heroCardFrontNode.appendChild(heroAttackTypeNode);
const heroAttackTypeDom = document.createElement("img");
heroAttackTypeNode.appendChild(heroAttackTypeDom);
// before the card flip, won't show the node
heroAttackTypeNode.style.display = "none";

// for base str, agi, int
const heroBaseNode = document.getElementsByClassName("hero-base")[0];

// hero abilities
const heroAbilitiesListNode = document.getElementsByClassName(
  "hero-abilities-list"
)[0];

// hero video/image
const heroVideoNode = heroCardFrontNode.getElementsByClassName("hero-video")[0];
// hero video fallback img
const heroVideoNodeFallbackImgNode = document.createElement("img");
heroVideoNode.appendChild(heroVideoNodeFallbackImgNode);
const heroVideoSourceNode = document.createElement("source");
heroVideoNode.appendChild(heroVideoSourceNode);

// hero complexity for card
const complexityListNode = document.createElement("div");
complexityListNode.classList.add("complexity-list");
heroCardFrontNode.appendChild(complexityListNode);

// hero mp hp
const heroMpHpNode = heroCardFrontNode.getElementsByClassName("hero-mp-hp")[0];
const heroHpDom = document.createElement("span");
heroHpDom.classList.add("hero-hp");
heroMpHpNode.appendChild(heroHpDom);
const heroMpDom = document.createElement("span");
heroMpDom.classList.add("hero-mp");
heroMpHpNode.appendChild(heroMpDom);

// hero name
const heroNameNode = heroCardFrontNode.getElementsByClassName("hero-name")[0];

// hero roles
const heroRolesNode = heroCardFrontNode.getElementsByClassName("hero-roles")[0];

// hero info
const heroAttackNode =
  heroCardFrontNode.getElementsByClassName("hero-attack")[0];
const heroDefenseNode =
  heroCardFrontNode.getElementsByClassName("hero-defense")[0];
const heroMobilityNode =
  heroCardFrontNode.getElementsByClassName("hero-mobility")[0];

// base_attack
const heroBaseAttackDom = document.createElement("span");
heroBaseAttackDom.classList.add("hero-base_attack");
heroAttackNode.appendChild(heroBaseAttackDom);

// attack_rate
const heroAttackRateDom = document.createElement("span");
heroAttackRateDom.classList.add("hero-attack_rate");
heroAttackNode.appendChild(heroAttackRateDom);

// attack_range
const heroAttackRangeDom = document.createElement("span");
heroAttackRangeDom.classList.add("hero-attack_range");
heroAttackNode.appendChild(heroAttackRangeDom);

// trun_rate
const heroTurnRateDom = document.createElement("span");
heroTurnRateDom.classList.add("hero-turn_rate");
heroMobilityNode.appendChild(heroTurnRateDom);

// move_speed
const heroMoveSpeedDom = document.createElement("span");
heroMoveSpeedDom.classList.add("hero-move_speed");
heroMobilityNode.appendChild(heroMoveSpeedDom);

// vision
const heroVisionDom = document.createElement("span");
heroVisionDom.classList.add("hero-vision");
heroMobilityNode.appendChild(heroVisionDom);

// hero armor
const heroArmorDom = document.createElement("span");
heroArmorDom.classList.add("hero-armor");
heroDefenseNode.appendChild(heroArmorDom);

// hero magic resist
const heroMagicResistDom = document.createElement("span");
heroMagicResistDom.classList.add("hero-magic_resist");
heroDefenseNode.appendChild(heroMagicResistDom);

// part3
const heroAbilitiesTalentNode = heroCardFrontNode.getElementsByClassName(
  "hero-abilities-talent"
)[0];
const heroScepterShardNode = document.createElement("img");
heroScepterShardNode.classList.add("hero-scepter-shard");
heroScepterShardNode.setAttribute("src", aghsScepter);
heroScepterShardNode.setAttribute("alt", "Dota2 scepter Shard");
heroAbilitiesTalentNode.append(heroScepterShardNode);

// talent tooltip

const heroTalentNode =
  heroCardFrontNode.getElementsByClassName("hero-talent")[0];
const heroTalentTooltipNode =
  document.getElementsByClassName("talent-tooltip")[0];

// default tooltip should not display
heroTalentTooltipNode.style.display = "none";

const heroAbilityTooltipNode =
  document.getElementsByClassName("ability-tooltip")[0];

heroAbilityTooltipNode.style.display = "none";

const heroScepterShardTooltipNode = document.getElementsByClassName(
  "scepter-shard-tooltip"
)[0];

heroScepterShardTooltipNode.style.display = "none";
// main()

const main = async () => {
  await init(heroId);

  // after click hero image should update the card
  for (let heroCard of heroCards) {
    heroCard.addEventListener("click", async (e) => {
      // first reset something
      heroVideoNode.setAttribute("src", "./images/Dota2Logo.svg");
      heroVideoNode.setAttribute("poster", "./images/Dota2Logo.svg");
      heroVideoSourceNode.setAttribute("src", "./images/Dota2Logo.svg");
      heroVideoNodeFallbackImgNode.setAttribute(
        "src",
        "./images/Dota2Logo.svg"
      );
      // flip the card to back first
      heroCardNode.style.transform = "rotateY(0deg)";

      heroPrimaryAttrNode.style.display = "none";
      heroAttackTypeNode.style.display = "none";
      heroId = e.target.getAttribute("data-hero-id");
      init(heroId);
    });
  }
};

main();

async function init(heroId) {
  heroData = await getGraphqlData(heroQuery(heroId));
  rolesData = await getGraphqlData(rolesQuery());
  abilitiesData = await getGraphqlData(abilitiesQuery());

  // previous, we have a flip animation style for front and back card
  if (heroData && rolesData) {
    heroCardNode.style.transform = "rotateY(180deg)";

    heroPrimaryAttrNode.style.display = "flex";
    heroAttackTypeNode.style.display = "flex";
  }

  const { abilities, stats, shortName, language, roles, talents } =
    heroData.data.constants.hero;

  const {
    primaryAttribute,
    agilityBase,
    agilityGain,
    intelligenceBase,
    intelligenceGain,
    strengthBase,
    strengthGain,
    attackType,
    complexity,
    hpBarOffset,
    mpRegen,
    moveSpeed,
    moveTurnRate,
    startingMagicArmor,
    startingArmor,
    attackRate,
    attackRange,
    startingDamageMin,
    startingDamageMax,
    visionNighttimeRange,
    visionDaytimeRange,
  } = stats;

  updateHero(
    primaryAttribute,
    agilityBase,
    agilityGain,
    intelligenceBase,
    intelligenceGain,
    strengthBase,
    strengthGain,
    attackType,
    abilities,
    shortName,
    complexity,
    hpBarOffset,
    mpRegen,
    language,
    roles,
    rolesData,
    moveSpeed,
    moveTurnRate,
    startingMagicArmor,
    startingArmor,
    attackRate,
    attackRange,
    startingDamageMin,
    startingDamageMax,
    visionNighttimeRange,
    visionDaytimeRange,
    talents,
    abilitiesData
  );
}

function updateHero(
  primaryAttribute,
  agilityBase,
  agilityGain,
  intelligenceBase,
  intelligenceGain,
  strengthBase,
  strengthGain,
  attackType,
  abilities,
  shortName,
  complexity,
  hpBarOffset,
  mpRegen,
  language,
  roles,
  rolesData,
  moveSpeed,
  moveTurnRate,
  startingMagicArmor,
  startingArmor,
  attackRate,
  attackRange,
  startingDamageMin,
  startingDamageMax,
  visionNighttimeRange,
  visionDaytimeRange,
  talents,
  abilitiesData
) {
  setHeroBase(
    primaryAttribute,
    agilityBase,
    agilityGain,
    intelligenceBase,
    intelligenceGain,
    strengthBase,
    strengthGain
  );
  setHeroPrimaryAttribute(primaryAttribute);
  setHeroAttackType(attackType);
  setHeroAbilities(abilities);
  setHeroVideo(shortName);
  setHeroComplexity(complexity);
  setHeroHPMP(strengthBase, hpBarOffset, intelligenceBase, mpRegen);
  setHeroName(language.displayName);
  setHeroRoles(roles, rolesData.data.constants.roles);
  setHeroBasic(
    moveSpeed,
    moveTurnRate,
    startingMagicArmor,
    startingArmor,
    attackRate,
    attackRange,
    startingDamageMin,
    startingDamageMax,
    visionNighttimeRange,
    visionDaytimeRange
  );
  setHeroTalents(talents, abilitiesData.data.constants.abilities);
  setHeroAbilityHover(abilities);
  setHeroScepterShard(abilities);
}

/**
 * Set hero video/image
 * @param {string} shortName - Hero shortName for video
 */
function setHeroVideo(shortName) {
  // video poster
  heroVideoNode.setAttribute("src", VIDEO_URL + shortName + ".webm");
  heroVideoNode.setAttribute("poster", VIDEO_URL + shortName + ".png");
  heroVideoNodeFallbackImgNode.setAttribute(
    "src",
    VIDEO_URL + shortName + ".png"
  );
  heroVideoSourceNode.setAttribute("src", VIDEO_URL + shortName + ".webm");
  heroVideoSourceNode.setAttribute("type", "video/webm");
}

/**
 * Set hero name
 * @param {string} displayName - Hero display name base on the language
 */
function setHeroName(displayName) {
  heroNameNode.innerHTML = displayName;
}

/**
 * Set hero roles
 * @param {array} roles - List hero roles
 * @param {array} rolesData - List all roles
 */
function setHeroRoles(roles, rolesData) {
  heroRolesNode.innerHTML = "";

  for (let role of roles) {
    const heroRolesDom = document.createElement("span");
    heroRolesDom.classList.add("hero-roles");
    heroRolesDom.innerHTML = role["roleId"] + ",";
    heroRolesNode.appendChild(heroRolesDom);
  }
}

/**
 * Set hero hp mp
 * @param {number} strengthBase - Hero base strength
 * @param {number} hpBarOffset - Hero hp offset
 * @param {number} intelligenceBase - Hero base intelligence
 * @param {number} mpRegen - Hero mana regen
 */
function setHeroHPMP(strengthBase, hpBarOffset, intelligenceBase, mpRegen) {
  // Hero hp and hp regenration have some fomular
  // https://dota2.fandom.com/wiki/Health
  const hp = BASE_HEALTH + strengthBase * HP_UNIT;
  const hpGen = (
    hpBarOffset +
    strengthBase * BOUNUS_HEALTH_REGENERATION
  ).toFixed(2);

  // https://dota2.fandom.com/wiki/Mana
  const mp = BASE_MANA + intelligenceBase * MP_UNIT;
  const mpGen = (mpRegen + intelligenceBase * BOUNUS_MANA_REGENERATION).toFixed(
    2
  );

  heroHpDom.innerHTML = hp + " / +" + hpGen;
  heroMpDom.innerHTML = mp + " / +" + mpGen;
}

/**
 * Set hero complexity at top right corner
 * @param {number} complexity - Hero complexity: 1, 2,3
 */
function setHeroComplexity(complexity) {
  complexityListNode.innerHTML = "";

  for (let i = 1; i <= complexity; i++) {
    const complexityImgDom = document.createElement("span");
    complexityImgDom.classList.add("hero-complexity-num");
    complexityListNode.appendChild(complexityImgDom);
  }
}

/**
 * Set hero base attribute
 * @param {string} primaryAttribute - Hero primary attribute
 * @param {number} agilityBase - Hero base agility
 * @param {number} agilityGain - Hero agility gain
 * @param {number} intelligenceBase - Hero base intelligence
 * @param {number} intelligenceGain - Hero intelligence gain
 * @param {number} strengthBase - Hero base strength
 * @param {number} strengthGain - Hero strength gain
 */
function setHeroBase(
  primaryAttribute,
  agilityBase,
  agilityGain,
  intelligenceBase,
  intelligenceGain,
  strengthBase,
  strengthGain
) {
  heroBaseNode.innerHTML = "";
  // hero base
  const heroBaseStrGainDom = document.createElement("div");
  heroBaseStrGainDom.classList = ["hero-base-str-gain"];

  const heroBaseIntGainDom = document.createElement("div");
  heroBaseIntGainDom.classList = ["hero-base-int-gain"];

  const heroBaseAgiGainDom = document.createElement("div");
  heroBaseAgiGainDom.classList = ["hero-base-agi-gain"];

  heroBaseStrGainDom.innerHTML = `${strengthBase} <span>+${strengthGain.toFixed(
    2
  )}</span>`;
  heroBaseIntGainDom.innerHTML = `${intelligenceBase} <span>+${intelligenceGain.toFixed(
    2
  )}</span>`;
  heroBaseAgiGainDom.innerHTML = `${agilityBase} <span>+${agilityGain.toFixed(
    2
  )}</span>`;

  // here different primary attr hero, the first attr will be his primary attr
  if (primaryAttribute === "str") {
    heroBaseStrGainDom.classList.add("primary-att");
    heroBaseNode.appendChild(heroBaseStrGainDom);
    heroBaseNode.appendChild(heroBaseIntGainDom);
    heroBaseNode.appendChild(heroBaseAgiGainDom);
  } else if (primaryAttribute === "int") {
    heroBaseIntGainDom.classList.add("primary-att");
    heroBaseNode.appendChild(heroBaseIntGainDom);
    heroBaseNode.appendChild(heroBaseAgiGainDom);
    heroBaseNode.appendChild(heroBaseStrGainDom);
  } else if (primaryAttribute === "agi") {
    heroBaseAgiGainDom.classList.add("primary-att");
    heroBaseNode.appendChild(heroBaseAgiGainDom);
    heroBaseNode.appendChild(heroBaseStrGainDom);
    heroBaseNode.appendChild(heroBaseIntGainDom);
  }
}

/**
 * Set hero primary attribute image
 * @param {string} primaryAttribute - Hero primary attribute
 */
function setHeroPrimaryAttribute(primaryAttribute) {
  let pA = "";
  if (PRIMARY_ATTR_LIST[primaryAttribute] === "hero_agility") {
    pA = heroAgility;
  } else if (PRIMARY_ATTR_LIST[primaryAttribute] === "hero_strength") {
    pA = heroStrength;
  } else {
    pA = heroIntelligence;
  }
  heroPrimaryAttrDom.setAttribute("src", pA);
}

/**
 * Set hero attack type image
 * @param {string} attackType - Hero attack type
 */
function setHeroAttackType(attackType) {
  let aT = attackType.toLowerCase() === "melee" ? melee : ranged;
  heroAttackTypeDom.setAttribute("src", aT);
}

/**
 * Set hero basic info
 * @param {number} moveSpeed - Hero move Speed
 * @param {number} moveTurnRate - Hero turn rate
 * @param {number} startingMagicArmor - Hero magic resist
 * @param {number} startingArmor  - Hero armor
 * @param {number} attackRate - Hero attack rate
 * @param {number} attackRange - Hero attack range
 * @param {number} startingDamageMin - Hero min damage
 * @param {number} startingDamageMax - Hero max damage
 * @param {number} visionNighttimeRange - Hero night time vision range
 * @param {number} visionDaytimeRange - Hero day time vision range
 */
function setHeroBasic(
  moveSpeed,
  moveTurnRate,
  startingMagicArmor,
  startingArmor,
  attackRate,
  attackRange,
  startingDamageMin,
  startingDamageMax,
  visionNighttimeRange,
  visionDaytimeRange
) {
  // attack
  const baseAttack = `${startingDamageMin} - ${startingDamageMax}`;
  // vision
  const vision = `${visionNighttimeRange} - ${visionDaytimeRange}`;

  // attack
  heroBaseAttackDom.innerHTML = baseAttack;
  heroAttackRateDom.innerHTML = attackRate.toFixed(2);
  heroAttackRangeDom.innerHTML = attackRange;

  // defense
  heroArmorDom.innerHTML = startingArmor.toFixed(2);
  heroMagicResistDom.innerHTML = startingMagicArmor + "%";

  // mobility
  heroTurnRateDom.innerHTML = moveTurnRate.toFixed(2);
  heroMoveSpeedDom.innerHTML = moveSpeed;
  heroVisionDom.innerHTML = vision;
}

/**
 * Set hero abilities
 * @param {array} abilities - hero abilities
 */
function setHeroAbilities(abilities) {
  heroAbilitiesListNode.innerHTML = "";
  // we need filter those generic_hidden abilities that are useless
  abilities = abilities.filter(
    (ability) => ability["ability"]["name"] !== "generic_hidden"
  );

  // only list normal abilities
  const onlyNoramlAbilities = abilities.filter((ability) => {
    return (
      !ability["ability"]["stat"]["isGrantedByScepter"] &&
      !ability["ability"]["stat"]["isGrantedByShard"]
    );
  });

  // here get ability is graned by scepter, some ability is granted by scepter some is upgraded
  const abilitiesIsGrantedByScepter = abilities.filter(
    (i) =>
      i["ability"]["stat"]["isGrantedByScepter"] ||
      i["ability"]["stat"]["hasScepterUpgrade"]
  )[0];

  const abilitiesIsGrantedByShard = abilities.filter(
    (i) =>
      i["ability"]["language"]?.shardDescription ||
      i["ability"]["stat"]["isGrantedByShard"]
  )[0];

  for (let ability of onlyNoramlAbilities) {
    const heroAbilityDom = document.createElement("img");
    heroAbilityDom.setAttribute("onerror", `this.src="${IMG_ONERROR}"`);
    heroAbilityDom.setAttribute(
      "src",
      `${STRATZ_ABILITIE_URL}/${ability["ability"]["name"]}.png`
    );
    heroAbilityDom.setAttribute("data-ability", ability["ability"]["name"]);
    // I wanna add yellow border for ultimate abilities
    heroAbilityDom.classList.add("hero-ability");
    if (ability["ability"]["stat"]["isUltimate"]) {
      heroAbilityDom.classList.add("hero-ability-isUltimate");
    }
    heroAbilitiesListNode.appendChild(heroAbilityDom);
  }
  // show the shard icon/scepter icon
  let aghsScepter = "";
  if (!!abilitiesIsGrantedByScepter && !!abilitiesIsGrantedByShard) {
    aghsScepter = aghs1scepter1;
  } else if (!!abilitiesIsGrantedByScepter && !abilitiesIsGrantedByShard) {
    aghsScepter = aghs1scepter0;
  } else if (!abilitiesIsGrantedByScepter && !!abilitiesIsGrantedByShard) {
    aghsScepter = aghs0scepter1;
  } else {
    aghsScepter = aghs0scepter0;
  }
  heroScepterShardNode.setAttribute("src", aghsScepter);
}

// {
//   "slot": 1,
//   "gameVersionId": 149,
//   "abilityId": 5003,
//   "ability": {
//     "id": 5003,
//     "name": "antimage_mana_break",
//     "uri": "antimage",
//     "language": {
//       "displayName": "Mana Break",
//       "description": [
//         "Burns an opponent's mana on each attack. Mana Break deals 50% of the mana burned as damage to the target. Mana Break has 50% effect if caused by illusions."
//       ],
//       "attributes": [
//         "MANA BURNED PER HIT: 28 / 40 / 52 / 64",
//         "MAX MANA BURNED PER HIT: 1% / 1.8% / 2.6% / 3.4%"
//       ],
//       "lore": "A modified technique of the Turstarkuri monks' peaceful ways is to turn magical energies on their owner.",
//       "aghanimDescription": null,
//       "shardDescription": null,
//       "notes": []
//     },
//     "stat": {
//       "abilityId": 5003,
//       "type": 0,
//       "behavior": 2,
//       "unitTargetType": 0,
//       "unitTargetTeam": 0,
//       "unitTargetFlags": 0,
//       "unitDamageType": 1,
//       "spellImmunity": 4,
//       "modifierSupportValue": 1,
//       "modifierSupportBonus": 0,
//       "isOnCastbar": true,
//       "isOnLearnbar": true,
//       "fightRecapLevel": 0,
//       "isGrantedByScepter": false,
//       "hasScepterUpgrade": false,
//       "maxLevel": null,
//       "levelsBetweenUpgrades": 0,
//       "requiredLevel": 0,
//       "hotKeyOverride": null,
//       "displayAdditionalHeroes": false,
//       "castRange": null,
//       "castRangeBuffer": [
//         250
//       ],
//       "castPoint": null,
//       "channelTime": null,
//       "cooldown": null,
//       "damage": null,
//       "manaCost": null,
//       "isUltimate": false,
//       "duration": "",
//       "charges": "",
//       "chargeRestoreTime": "",
//       "isGrantedByShard": false,
//       "dispellable": "NONE"
//     },
//     "attributes": [
//       {
//         "name": "illusion_percentage",
//         "value": "50",
//         "linkedSpecialBonusAbilityId": null,
//         "requiresScepter": false
//       },
//       {
//         "name": "mana_per_hit",
//         "value": "28 40 52 64",
//         "linkedSpecialBonusAbilityId": null,
//         "requiresScepter": false
//       },
//       {
//         "name": "mana_per_hit_pct",
//         "value": "1 1.8 2.6 3.4",
//         "linkedSpecialBonusAbilityId": 666,
//         "requiresScepter": false
//       },
//       {
//         "name": "percent_damage_per_burn",
//         "value": "50",
//         "linkedSpecialBonusAbilityId": null,
//         "requiresScepter": false
//       },
//       {
//         "name": "silence_chance",
//         "value": "15",
//         "linkedSpecialBonusAbilityId": null,
//         "requiresScepter": false
//       },
//       {
//         "name": "silence_duration",
//         "value": "3",
//         "linkedSpecialBonusAbilityId": null,
//         "requiresScepter": false
//       }
//     ],
//     "isTalent": false
//   }
// },

// "stats": {
//   "enabled": true,
//   "heroUnlockOrder": 1,
//   "team": true,
//   "cMEnabled": true,
//   "newPlayerEnabled": true,
//   "attackType": "Melee",
//   "startingArmor": 4,
//   "startingMagicArmor": 25,
//   "startingDamageMin": 53,
//   "startingDamageMax": 57,
//   "attackRate": 1.399999976158142,
//   "attackAnimationPoint": 0.30000001192092896,
//   "attackAcquisitionRange": 600,
//   "attackRange": 150,
//   "primaryAttribute": "agi",
//   "strengthBase": 23,
//   "strengthGain": 1.600000023841858,
//   "intelligenceBase": 12,
//   "intelligenceGain": 1.7999999523162842,
//   "agilityBase": 24,
//   "agilityGain": 2.799999952316284,
//   "mpRegen": 0,
//   "moveSpeed": 310,
//   "moveTurnRate": 0.6000000238418579,
//   "hpBarOffset": 0,
//   "visionDaytimeRange": 1800,
//   "visionNighttimeRange": 800,
//   "complexity": 1
// }

function setHeroTalents(talents, abilitiesData) {
  heroTalentTooltipNode.innerHTML = "<span class='talent-bg-img'></span>";
  // talents
  talents = talents.reverse();
  for (let talent of talents) {
    const heroTalentsDom = document.createElement("span");
    heroTalentTooltipNode.appendChild(heroTalentsDom);
    const heroTalentData = abilitiesData.find(
      (ability) => ability["id"] === talent["abilityId"]
    );
    heroTalentsDom.innerHTML =
      heroTalentData["language"]?.displayName ?? "loading";
    heroTalentsDom.classList = [`talent-rows item${talent["slot"]}`];
  }
}

// TODO: hover the talent note
heroTalentNode.addEventListener("mouseover", (e) => {
  // after show the tooltip, we need position above the talent icon
  const heroTalent = e.target;

  dynamicModalPostion(heroTalent, "talent-tooltip", "flex");
  // const heroCard = e["path"].filter((i) => i["className"] === "hero-card")[0];
  // const heroAbilitiesTalent = e["path"].filter(
  //   (i) => i["className"] === "hero-abilities-talent"
  // )[0];

  // heroTalentTooltipNode.style.display = "flex";

  // const tooltipHeight = heroTalentTooltipNode.offsetHeight;
  // const tooltipWidth = heroTalentTooltipNode.offsetWidth;

  // const tooltipX =
  //   heroCard["offsetLeft"] +
  //   heroTalent["offsetLeft"] +
  //   heroTalent["width"] / 2 -
  //   tooltipWidth / 2 +
  //   heroAbilitiesTalent["offsetLeft"] +
  //   "px";

  // const tooltipY =
  //   heroCard["offsetTop"] +
  //   heroTalent["offsetTop"] -
  //   tooltipHeight +
  //   heroAbilitiesTalent["offsetTop"] +
  //   "px";
  // heroTalentTooltipNode.style.left = tooltipX;
  // heroTalentTooltipNode.style.top = tooltipY;
});

heroTalentNode.addEventListener("mouseout", (e) => {
  heroTalentTooltipNode.style.display = "none";
});

// ability tooltip
function setHeroAbilityHover(abilities) {
  const heroAbilitiesList =
    heroCardFrontNode.getElementsByClassName("hero-ability");
  for (let i of heroAbilitiesList) {
    i.addEventListener("mouseover", (e) => {
      const heroAbility = e.target;

      heroAbilityTooltipNode.innerHTML = abilityTooltipTem(
        heroAbility.getAttribute("data-ability"),
        abilities
      );

      dynamicModalPostion(heroAbility, "ability-tooltip");

      // similar with talent tooltip position
      // const heroCard = e["path"].filter(
      //   (p) => p["className"] === "hero-card"
      // )[0];
      // const heroAbilitiesTalent = e["path"].filter(
      //   (p) => p["className"] === "hero-abilities-talent"
      // )[0];

      // heroAbilityTooltipNode.style.display = "block";

      // const tooltipHeight = heroAbilityTooltipNode.offsetHeight;
      // const tooltipWidth = heroAbilityTooltipNode.offsetWidth;

      // let tooltipX, tooltipY;

      // // if modal height is exceed the top edge, we should move the modal right display
      // if (
      //   tooltipHeight >
      //   heroCard["offsetTop"] + heroAbility["offsetTop"] - 20
      // ) {
      //   tooltipX =
      //     heroCard["offsetLeft"] +
      //     heroAbility["offsetLeft"] +
      //     heroAbility["width"] +
      //     heroAbilitiesTalent["offsetLeft"] +
      //     "px";
      //   tooltipY =
      //     heroCard["offsetTop"] +
      //     heroAbility["offsetTop"] +
      //     heroAbility["height"] -
      //     tooltipHeight / 2 +
      //     "px";
      // } else {
      //   tooltipX =
      //     heroCard["offsetLeft"] +
      //     heroAbility["offsetLeft"] +
      //     heroAbility["width"] / 2 -
      //     tooltipWidth / 2 +
      //     heroAbilitiesTalent["offsetLeft"] +
      //     "px";
      //   tooltipY =
      //     heroCard["offsetTop"] +
      //     heroAbility["offsetTop"] -
      //     tooltipHeight +
      //     heroAbilitiesTalent["offsetTop"] +
      //     "px";
      // }

      // heroAbilityTooltipNode.style.left = tooltipX;
      // heroAbilityTooltipNode.style.top = tooltipY;

      i.addEventListener("mouseout", (e) => {
        heroAbilityTooltipNode.style.display = "none";
      });
    });
  }
}

// hover on the ability node
// abilities tooltip content template
const abilityTooltipTem = (abilityName, abilities) => {
  const ability = abilities.find(
    (ability) => ability["ability"]["name"] === abilityName
  );
  const { name, language, attributes, stat } = ability["ability"];
  const {
    cooldown,
    manaCost,
    unitDamageType,
    dispellable,
    unitTargetTeam,
    spellImmunity,
  } = stat;
  const { displayName, description } = language || {};
  const imgData = `${STRATZ_ABILITIE_URL}/${name}.png`;

  let abilityHTML = "";

  abilityHTML = abilityScepterShardCommonContent(
    spellImmunity,
    manaCost,
    cooldown,
    attributes,
    unitDamageType,
    dispellable,
    unitTargetTeam,
    description
  );

  return `
    <div class="item-main">
      <img height="50px" src='${imgData}' onerror='this.src="${IMG_ONERROR}"'/>
      <div class="item-main-right"><h3>${displayName}</h3></div>
    </div>

    ${abilityHTML}
    
  
    `;
};

// seem scepter and ablitiy modal have common content I will grab them in a function for reuse
function abilityScepterShardCommonContent(
  spellImmunity,
  manaCost,
  cooldown,
  attributes,
  unitDamageType,
  dispellable,
  unitTargetTeam,
  description = ""
) {
  // mana cose
  const mcData = manaCost !== null ? manaCost.join(" / ") : "NA";
  //cool down
  const cdData = cooldown !== null ? cooldown.join(" / ") : "NA";

  let attribData = "";
  if (attributes) {
    for (let attr of attributes) {
      const { name, value } = attr;
      const nameData = name.replaceAll("_", " ").toUpperCase();
      const valueData = value.replaceAll(" ", " / ");
      attribData += `<div class="item-row"><label>${nameData}:</label><span class="item-value"> ${valueData} </span></div>`;
    }
  }

  // here damage type is base on
  let damTypeText;
  if (unitDamageType === 1) {
    damTypeText = "red-txt";
  } else if (unitDamageType === 2) {
    damTypeText = "blue-txt";
  } else {
    damTypeText = "green-txt";
  }

  const dispellableHTML =
    dispellable === "YES"
      ? `<div class="item-row"><label>DISPELLABLE:</label>${dispellable}</div>`
      : "";

  const dmgTypeHTML = unitDamageType
    ? `<div class="item-row"><label>DAMAGE TYPE:</label><span class="${damTypeText}">${formatText(
        DAMAGE_TYPE[unitDamageType],
        "_",
        2
      )}</span></div>`
    : "";

  const unitTargetTeamHTML = unitTargetTeam
    ? `
  <div class="item-row"><label>DAMAGE AFFECTS: <label><span>
      ${formatText(DOTA_UNIT_TARGET_TEAM[unitTargetTeam], "_", 4)}
  </span></div>`
    : "";

  const spellImmunityText = spellImmunity !== 4 ? "green-txt" : "red-txt";
  const spellImmunityHTML = spellImmunity
    ? `
  <div class="item-row"><label>PIERCES SPELL IMMUNITY: <label><span class="${spellImmunityText}">
      ${SPELL_IMMUNITY_LIST[spellImmunity]}
</span></div>
  `
    : "";

  return `<div class="item-sub box">
    ${unitTargetTeamHTML}
    ${dispellableHTML}
    ${dmgTypeHTML}
    ${spellImmunityHTML}
  </div>

  ${description ? `<div class="item-desc box">${description[0]}</div>` : ""}
  ${attributes ? `<div class="item-sub box"> ${attribData} </div>` : ""}

  ${
    manaCost !== null && cooldown !== null
      ? `
    <div class="item-mc-cd">
      ${
        manaCost !== null
          ? `
        <span class="item-mc">
          <span class="mana-icon"></span>${mcData}
        </span>
      `
          : ""
      }
      ${
        cooldown !== null
          ? `
        <span class="item-cd">
          <img width="15px" height="15px" alt="cooldown" src="${cooldownIcon}"/>${cdData}
        </span>
      `
          : ""
      }
    </div>
    `
      : ""
  }`;
}

// scepter modal
heroScepterShardNode.addEventListener("mouseover", (e) => {
  const heroScepterShard = e.target;

  dynamicModalPostion(heroScepterShard, "scepter-shard-tooltip", "flex");
  // const heroCard = e["path"].filter((p) => p["className"] === "hero-card")[0];
  // const heroAbilitiesTalent = e["path"].filter(
  //   (p) => p["className"] === "hero-abilities-talent"
  // )[0];

  // heroScepterShardTooltipNode.style.display = "flex";

  // const tooltipHeight = heroScepterShardTooltipNode.offsetHeight;
  // const tooltipWidth = heroScepterShardTooltipNode.offsetWidth;

  // const tooltipX =
  //   heroCard["offsetLeft"] +
  //   heroScepterShard["offsetLeft"] +
  //   heroScepterShard["width"] +
  //   heroAbilitiesTalent["offsetLeft"] +
  //   "px";

  // const tooltipY =
  //   heroCard["offsetTop"] +
  //   heroScepterShard["offsetTop"] +
  //   heroScepterShard["height"] / 2 -
  //   tooltipHeight / 2 +
  //   "px";

  // heroScepterShardTooltipNode.style.left = tooltipX;
  // heroScepterShardTooltipNode.style.top = tooltipY;
});
heroScepterShardNode.addEventListener("mouseout", (e) => {
  heroScepterShardTooltipNode.style.display = "none";
});

// scepter data
function setHeroScepterShard(abilities) {
  heroScepterShardTooltipNode.innerHTML = "";
  // here get ability is graned by scepter, some ability is granted by scepter some is upgraded
  const abilitiesIsGrantedByScepter = abilities.filter(
    (i) =>
      i["ability"]["stat"]["isGrantedByScepter"] ||
      (i["ability"]["stat"]["hasScepterUpgrade"] &&
        (i["ability"]["language"]?.aghanimDescription ||
          i["ability"]["language"]?.description[0]))
  )[0];

  const abilitiesIsGrantedByShard = abilities.filter(
    (i) =>
      i["ability"]["stat"]["isGrantedByShard"] ||
      i["ability"]["language"]?.shardDescription
  )[0];

  return (heroScepterShardTooltipNode.innerHTML = `
    ${scepterShardTooltipTem(abilitiesIsGrantedByScepter, "scepter")}
    <div class="divided"></div>
    ${scepterShardTooltipTem(abilitiesIsGrantedByShard, "shard")}
  `);
}

const scepterShardTooltipTem = (ability, isScepterOrShard) => {
  // if no ability, show no data but some UI
  let noIcon = isScepterOrShard === "scepter" ? scepter0 : shard0;
  if (!ability) {
    return `
      <div class="${isScepterOrShard} scepter-shard-row">
        <div class="item-main">
          <img src="${noIcon}" alt="${isScepterOrShard} img" />
          <div class="item-main-right">
            <h3>Aghanim's ${isScepterOrShard}</h3>
          </div>
        </div>
        <div class="no-detail">Current the hero does not have Aghanim</div>
      </div>
    `;
  }

  const { stat, language, name, attributes } = ability["ability"];
  const {
    hasScepterUpgrade,
    isGrantedByShard,
    cooldown,
    manaCost,
    unitDamageType,
    dispellable,
    spellImmunity,
    unitTargetTeam,
  } = stat;
  const { aghanimDescription, description, displayName, shardDescription } =
    language || {};
  const imgData = `${STRATZ_ABILITIE_URL}/${name}.png`;

  let isScepterUpgradeHTML;
  let upgradeOrNewText = "UPGRADE";
  let abilityHTML;
  // for scepter and shared, some abilities is granted some is upgraded
  if (isScepterOrShard === "scepter") {
    isScepterUpgradeHTML =
      hasScepterUpgrade && aghanimDescription
        ? aghanimDescription
        : description;
    upgradeOrNewText =
      hasScepterUpgrade && aghanimDescription ? "UPGRADE" : "NEW";
  }
  if (isScepterOrShard === "shard") {
    upgradeOrNewText = isGrantedByShard ? "NEW" : "UPGRADE";
  }
  // if new, we will show common content like ability, if it's upgrade, we some simple data
  if (upgradeOrNewText === "NEW") {
    abilityHTML = abilityScepterShardCommonContent(
      spellImmunity,
      manaCost,
      cooldown,
      attributes,
      unitDamageType,
      dispellable,
      unitTargetTeam
    );
  }

  let hasIcon = isScepterOrShard === "scepter" ? scepter1 : shard1;
  return `
      <div class="${isScepterOrShard} scepter-shard-row">
        <div class="item-main">
          <img src="${hasIcon}" alt="${isScepterOrShard} img" />
          <div class="item-main-right">
            <h3>Aghanim's ${isScepterOrShard}</h3>
          </div>
        </div>

        <div class="item-detail">
          <img class="ability-img" src="${imgData}" />
          <div class="item-detail-right">
            <h3>${displayName} <span>${upgradeOrNewText}</span></h3>
            <p>${
              isScepterOrShard === "scepter"
                ? isScepterUpgradeHTML
                : shardDescription
            }</p>
            ${abilityHTML}
          </div>
        </div>
    </div>
    `;
};

const pushEl = (t) => {
  const {
    className,
    offsetTop,
    offsetLeft,
    offsetHeight,
    offsetWidth,
    width,
    height,
  } = t;
  return {
    className,
    offsetTop,
    offsetLeft,
    offsetHeight,
    offsetWidth,
    width,
    height,
  };
};

function dynamicModalPostion(
  target,
  modalNodeClas,
  modalNodeDisplayValue = "block"
) {
  let t = target,
    i = 0,
    arr = [];
  const mouseTargetWidth = target["offsetWidth"];
  const mouseTargetHeight = target["offsetHeight"];
  const windowScrollY = window.scrollY;
  const windowScrollX = window.scrollX;
  arr.push(pushEl(t));
  do {
    t = t.offsetParent;
    i++;
    arr.push(pushEl(t));
  } while (t.offsetParent);

  const tooltipXOffsetLeftTotal = arr.reduce(
    (total, cur) => total + cur.offsetLeft,
    0
  );
  const tooltipYOffsetTopTotal = arr.reduce(
    (total, cur) => total + cur.offsetTop,
    0
  );

  let tooltipX, tooltipY;
  const modalNode = document.getElementsByClassName(modalNodeClas)[0];
  modalNode.style.display = modalNodeDisplayValue;
  const tooltipHeight = modalNode.offsetHeight;
  const tooltipWidth = modalNode.offsetWidth;

  // top
  if (tooltipYOffsetTopTotal - windowScrollY >= tooltipHeight) {
    tooltipY = tooltipYOffsetTopTotal - tooltipHeight + "px";

    // top  center----
    if (tooltipXOffsetLeftTotal - windowScrollX >= tooltipWidth / 2) {
      tooltipX =
        tooltipXOffsetLeftTotal +
        mouseTargetWidth / 2 -
        tooltipWidth / 2 +
        "px";
    }
    // top left -----
    if (tooltipXOffsetLeftTotal - windowScrollX < tooltipWidth / 2) {
      tooltipX = tooltipXOffsetLeftTotal + "px";
    }
    // top right ---
    if (
      window.innerWidth -
        (tooltipXOffsetLeftTotal - windowScrollX + mouseTargetWidth) <
      tooltipWidth / 2
    ) {
      tooltipX =
        tooltipXOffsetLeftTotal + mouseTargetHeight - tooltipWidth + "px";
    }
  }

  // top edge
  if (tooltipYOffsetTopTotal - windowScrollY < tooltipHeight / 2) {
    tooltipY = tooltipYOffsetTopTotal + "px";
    // top edge left
    if (
      window.innerWidth -
        (tooltipXOffsetLeftTotal - windowScrollX + mouseTargetWidth) >=
      tooltipWidth
    ) {
      tooltipX = tooltipXOffsetLeftTotal + mouseTargetWidth + "px";
    }
    // top edget right
    if (
      window.innerWidth -
        (tooltipXOffsetLeftTotal - windowScrollX + mouseTargetWidth) <
      tooltipWidth
    ) {
      tooltipX = tooltipXOffsetLeftTotal - tooltipWidth + "px";
    }
  }

  // vertical
  if (
    tooltipYOffsetTopTotal - windowScrollY < tooltipHeight &&
    tooltipYOffsetTopTotal - windowScrollY >= tooltipHeight / 2
  ) {
    tooltipY =
      tooltipYOffsetTopTotal + mouseTargetHeight / 2 - tooltipHeight / 2 + "px";

    // vertical right
    if (
      window.innerWidth -
        (tooltipXOffsetLeftTotal - windowScrollX + mouseTargetWidth) >=
      tooltipWidth
    ) {
      tooltipX = tooltipXOffsetLeftTotal + mouseTargetWidth + "px";
    }

    // vertical left
    if (
      window.innerWidth -
        (tooltipXOffsetLeftTotal - windowScrollX + mouseTargetWidth) <
      tooltipWidth
    ) {
      tooltipX = tooltipXOffsetLeftTotal - tooltipWidth + "px";
    }
  }

  // bottom edge
  if (
    window.innerHeight -
      (tooltipYOffsetTopTotal - windowScrollY + mouseTargetHeight) <
    tooltipHeight / 2
  ) {
    tooltipY =
      tooltipYOffsetTopTotal + mouseTargetHeight - tooltipHeight + "px";

    // bottom edge right
    if (
      window.innerWidth -
        (tooltipXOffsetLeftTotal - windowScrollX + mouseTargetWidth) >=
      tooltipWidth
    ) {
      tooltipX = tooltipXOffsetLeftTotal + mouseTargetWidth + "px";
    }

    // bottom edge left
    if (
      window.innerWidth -
        (tooltipXOffsetLeftTotal - windowScrollX + mouseTargetWidth) <
      tooltipWidth
    ) {
      tooltipX = tooltipXOffsetLeftTotal - tooltipWidth + "px";
    }
  }

  // bottom
  if (tooltipYOffsetTopTotal - windowScrollY < 0) {
    tooltipY = tooltipYOffsetTopTotal + mouseTargetHeight + "px";

    // top  center----
    if (tooltipXOffsetLeftTotal - windowScrollX >= tooltipWidth / 2) {
      tooltipX =
        tooltipXOffsetLeftTotal +
        mouseTargetWidth / 2 -
        tooltipWidth / 2 +
        "px";
    }
    // top left -----
    if (tooltipXOffsetLeftTotal - windowScrollX < tooltipWidth / 2) {
      tooltipX = tooltipXOffsetLeftTotal + "px";
    }
    // top right ---
    if (
      window.innerWidth -
        (tooltipXOffsetLeftTotal - windowScrollX + mouseTargetWidth) <
      tooltipWidth / 2
    ) {
      tooltipX =
        tooltipXOffsetLeftTotal + mouseTargetHeight - tooltipWidth + "px";
    }
  }

  modalNode.style.left = tooltipX;
  modalNode.style.top = tooltipY;

  console.log(windowScrollY);
  // console.table(arr)
  // console.log(tooltipYOffsetTopTotal - windowScrollY)
}
