CREATE TABLE users (
	"id" serial NOT NULL,
	"username" TEXT NOT NULL UNIQUE,
	"email" TEXT NOT NULL UNIQUE,
	"password" TEXT NOT NULL,
	"picture" TEXT NOT NULL,
	"createdAt" TIMESTAMP NOT NULL DEFAULT 'NOW()',
	CONSTRAINT "users_pk" PRIMARY KEY ("id")
) WITH (OIDS = FALSE);

CREATE TABLE hashtags (
	"id" serial NOT NULL,
	"name" varchar(255) NOT NULL UNIQUE,
	CONSTRAINT "hashtags_pk" PRIMARY KEY ("id")
) WITH (OIDS = FALSE);

CREATE TABLE posts (
	"id" serial NOT NULL,
	"writerId" integer NOT NULL,
	"url" TEXT NOT NULL,
	"description" varchar(280) NOT NULL,
	"urlTitle" text NOT NULL,
	"urlImage" text NOT NULL,
	"urlDescription" text NOT NULL,
	"createdAt" TIMESTAMP NOT NULL DEFAULT 'NOW()',
	"editedAt" TIMESTAMP,
	CONSTRAINT "posts_pk" PRIMARY KEY ("id")
) WITH (OIDS = FALSE);

CREATE TABLE "hashtagsPosts" (
	"id" serial NOT NULL,
	"postId" integer NOT NULL,
	"hashtagId" integer NOT NULL,
	CONSTRAINT "hashtagsPosts_pk" PRIMARY KEY ("id")
) WITH (OIDS = FALSE);

CREATE TABLE "likesPosts" (
	"id" serial NOT NULL,
	"postId" integer NOT NULL,
	"userId" integer NOT NULL,
	CONSTRAINT "likesPosts_pk" PRIMARY KEY ("id")
) WITH (OIDS = FALSE);

ALTER TABLE
	"posts"
ADD
	CONSTRAINT "posts_fk0" FOREIGN KEY ("writerId") REFERENCES "users"("id");

ALTER TABLE
	"hashtagsPosts"
ADD
	< < < < < < < HEAD CONSTRAINT "hashtagsPosts_fk0" FOREIGN KEY ("postId") REFERENCES "posts"("id");

== == == = CONSTRAINT "hashtagsPosts_fk0" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE CASCADE;

> > > > > > > 9d227b086234931ee4995c6a1c2bcf80d738dfd5
ALTER TABLE
	"hashtagsPosts"
ADD
	CONSTRAINT "hashtagsPosts_fk1" FOREIGN KEY ("hashtagId") REFERENCES "hashtags"("id");

ALTER TABLE
	"likesPosts"
ADD
	CONSTRAINT "likesPosts_fk0" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE CASCADE;

ALTER TABLE
	"likesPosts"
ADD
	CONSTRAINT "likesPosts_fk1" FOREIGN KEY ("userId") REFERENCES "users"("id");