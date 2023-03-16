function checkCollision(rows, groups) {
  return rows.every(({ sku, collisionContext }) => {
    if (collisionContext === "collision") return true;

    const candidateGroup = groups.find(({ candidates }) =>
      candidates.some(({ sku: candidateSku }) => sku === candidateSku)
    );

    const collisions = candidateGroup?.candidates.filter(
      ({ collisionContext }) => collisionContext === "collision"
    );
    return collisions?.every(({ sku: collisionSku }) =>
      rows.some(({ sku }) => sku === collisionSku)
    );
  });
}

const skus1 = [{ sku: "11", collisionContext: "candidate" }];
const skus2 = [
  { sku: "11", collisionContext: "candidate" },
  { sku: "13", collisionContext: "collision" },
];
const skus3 = [
  { sku: "11", collisionContext: "candidate" },
  { sku: "13", collisionContext: "collision" },
  { sku: "14", collisionContext: "collision" },
];
const skus4 = [
  { sku: "11", collisionContext: "candidate" },
  { sku: "13", collisionContext: "collision" },
  { sku: "14", collisionContext: "collision" },
  { sku: "22", collisionContext: "candidate" },
];
const skus5 = [{ sku: "22", collisionContext: "candidate" }];
const skus6 = [
  { sku: "22", collisionContext: "candidate" },
  { sku: "23", collisionContext: "collision" },
];
const skus7 = [
  { sku: "22", collisionContext: "candidate" },
  { sku: "23", collisionContext: "collision" },
  { sku: "24", collisionContext: "collision" },
];
const skus8 = [{ sku: "24", collisionContext: "collision" }];

const group1 = [
  { sku: "11", collisionContext: "candidate" },
  { sku: "13", collisionContext: "collision" },
  { sku: "14", collisionContext: "collision" },
];

const group2 = [
  { sku: "22", collisionContext: "candidate" },
  { sku: "23", collisionContext: "collision" },
  { sku: "24", collisionContext: "collision" },
];

const groups = [{ candidates: group1 }, { candidates: group2 }];

console.log(checkCollision(skus1, groups)); // Якщо в масиві skus є ["11"] з групи1 і це кандидат то це false
console.log(checkCollision(skus2, groups)); // Якщо в масиві skus є ["11", "13"] з групи1 і це кандидат та 1 колізія то це false
console.log(checkCollision(skus3, groups)); // Якщо в масиві skus є ["11", "13", "14"] з групи1 то це true
console.log(checkCollision(skus4, groups)); // Якщо в масиві skus є ["11", "13", "14", "22"], "22" - кандидатом з іншої групи2 і з групи1 є всі skus то це false тому що для кандидата "22" потрібно обрати також skus колізії "223", "224"
console.log(checkCollision(skus5, groups)); // Якщо в масиві skus є ["22"] з групи2 і це кандидат то це false
console.log(checkCollision(skus6, groups)); // Якщо в масиві skus є ["22", "23"] з групи2 і це кандидат та 1 колізія то це false
console.log(checkCollision(skus7, groups)); // Якщо в масиві skus є ["22", "23", "24"] з групи2 то це true
console.log(checkCollision(skus8, groups)); // Якщо в масиві skus є collision то це true
