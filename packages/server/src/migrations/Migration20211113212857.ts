import { Migration } from '@mikro-orm/migrations';

export class Migration20211113212857 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "users" ("id" serial primary key, "password" text not null, "token_version" int not null default 0, "username" text not null, "gender" text not null, "uid" text not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);');
    this.addSql('comment on table "users" is \'the table that contain users of the application\';');
    this.addSql('alter table "users" add constraint "users_username_unique" unique ("username");');
    this.addSql('alter table "users" add constraint "users_uid_unique" unique ("uid");');
  }

}
