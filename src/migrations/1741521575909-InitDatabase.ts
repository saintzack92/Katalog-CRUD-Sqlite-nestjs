const { MigrationInterface, QueryRunner } = require("typeorm");

class InitDatabase1741521575909 {
  name = 'InitDatabase1741521575909';

  async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "temporary_product" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(50) NOT NULL, "price" float NOT NULL, "description" text NOT NULL, "image" varchar, "madeOfChili" varchar, "madeOfRice" varchar, "madeOfSugar" varchar, "madeOfSalt" varchar, "madeOfPepper" varchar, "madeOfIce" varchar, "madeOfCream" varchar, "madeOfMilk" varchar, "madeOfBiscuit" varchar, "madeOfGrass" varchar, "isDeleted" boolean NOT NULL DEFAULT (0), "deletedAt" datetime, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`INSERT INTO "temporary_product"("id", "name", "price", "description", "image", "madeOfChili", "madeOfRice", "madeOfSugar", "madeOfSalt", "madeOfPepper", "madeOfIce", "madeOfCream", "madeOfMilk", "madeOfBiscuit", "madeOfGrass") SELECT "id", "name", "price", "description", "image", "madeOfChili", "madeOfRice", "madeOfSugar", "madeOfSalt", "madeOfPepper", "madeOfIce", "madeOfCream", "madeOfMilk", "madeOfBiscuit", "madeOfGrass" FROM "product"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`ALTER TABLE "temporary_product" RENAME TO "product"`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "product" RENAME TO "temporary_product"`);
        await queryRunner.query(`CREATE TABLE "product" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(50) NOT NULL, "price" float NOT NULL, "description" text NOT NULL, "image" varchar, "madeOfChili" varchar, "madeOfRice" varchar, "madeOfSugar" varchar, "madeOfSalt" varchar, "madeOfPepper" varchar, "madeOfIce" varchar, "madeOfCream" varchar, "madeOfMilk" varchar, "madeOfBiscuit" varchar, "madeOfGrass" varchar)`);
        await queryRunner.query(`INSERT INTO "product"("id", "name", "price", "description", "image", "madeOfChili", "madeOfRice", "madeOfSugar", "madeOfSalt", "madeOfPepper", "madeOfIce", "madeOfCream", "madeOfMilk", "madeOfBiscuit", "madeOfGrass") SELECT "id", "name", "price", "description", "image", "madeOfChili", "madeOfRice", "madeOfSugar", "madeOfSalt", "madeOfPepper", "madeOfIce", "madeOfCream", "madeOfMilk", "madeOfBiscuit", "madeOfGrass" FROM "temporary_product"`);
        await queryRunner.query(`DROP TABLE "temporary_product"`);
    }

}
module.exports = InitDatabase1741521575909;