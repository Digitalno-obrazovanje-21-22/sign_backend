CREATE TABLE "user" (
  "id" SERIAL PRIMARY KEY,
  "first_name" text,
  "last_name" text,
  "email" text,
  "password" text,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp DEFAULT (now())
);

CREATE TABLE "sign" (
  "id" SERIAL PRIMARY KEY,
  "name" text,
  "video_url" text
);

CREATE TABLE "room" (
  "id" SERIAL PRIMARY KEY,
  "private" boolean,
  "code" text,
  "is_over" boolean,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp DEFAULT (now())
);

CREATE TABLE "room_participant" (
  "id" SERIAL PRIMARY KEY,
  "is_owner" boolean,
  "score" int,
  "user_id" integer,
  "room_id" integer
);

ALTER TABLE "room_participant" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("id");

ALTER TABLE "room_participant" ADD FOREIGN KEY ("room_id") REFERENCES "room" ("id");