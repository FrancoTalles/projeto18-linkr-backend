CREATE DATABASE "linkr";
CREATE TABLE "users" (
	"id" SERIAL PRIMARY KEY NOT NULL,
	"email" serial NOT NULL,
	"password" serial NOT NULL,
	"username" serial NOT NULL
);

CREATE TABLE "posts" (
	"id" SERIAL PRIMARY KEY NOT NULL,
	"userId" int NOT NULL REFERENCES "users"("id"),
	"content" TEXT NOT NULL
);

CREATE TABLE "likes" (
	"id" SERIAL PRIMARY KEY NOT NULL,
	"userId" int NOT NULL REFERENCES "users"("id"),
	"postId" int NOT NULL REFERENCES "posts"("id"),
	"liked" BOOLEAN NOT NULL DEFAULT 'false'
);

CREATE TABLE "hashtag" (
	"id" SERIAL PRIMARY KEY NOT NULL,
	"userID" int NOT NULL REFERENCES "users"("id"),
	"postId" int NOT NULL REFERENCES "posts"("id")
);

CREATE TABLE "session" (
	"id" SERIAL PRIMARY KEY NOT NULL,
	"userId" int NOT NULL REFERENCES "users"("id"),
	"token" text NOT NULL
);