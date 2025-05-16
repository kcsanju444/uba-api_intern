"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUsersAndInternships1747327438795 = void 0;
class CreateUsersAndInternships1747327438795 {
    constructor() {
        this.name = 'CreateUsersAndInternships1747327438795';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`internship\` (\`id\` int NOT NULL AUTO_INCREMENT, \`joined_date\` date NOT NULL, \`completion_date\` date NOT NULL, \`is_certified\` tinyint NOT NULL, \`mentor_name\` varchar(255) NOT NULL, \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`internship\` ADD CONSTRAINT \`FK_efc7c9c49d46553d73e79f7c4e7\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`internship\` DROP FOREIGN KEY \`FK_efc7c9c49d46553d73e79f7c4e7\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`internship\``);
    }
}
exports.CreateUsersAndInternships1747327438795 = CreateUsersAndInternships1747327438795;
