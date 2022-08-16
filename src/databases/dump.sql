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
	"createdAt" TIMESTAMP NOT NULL DEFAULT 'NOW()',
	"editedAt" TIMESTAMP,
	"urlImage" TEXT NOT NULL,
	"urlDescription" TEXT NOT NULL,
	"urlTitle" TEXT NOT NULL,
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

CREATE TABLE comments (
	"id" serial,
	"writerId" integer NOT NULL,
	"postId" integer NOT NULL,
	"comment" varchar(280) NOT NULL,
	"createdAt" TIMESTAMP NOT NULL DEFAULT 'NOW()',
	CONSTRAINT "comments_pk" PRIMARY KEY ("id")
) WITH (OIDS = FALSE);

CREATE TABLE follows (
	"id" serial NOT NULL,
	"followerId" integer NOT NULL,
	"followedId" integer NOT NULL,
	"createdAt" TIMESTAMP NOT NULL DEFAULT 'NOW()',
	CONSTRAINT "follows_pk" PRIMARY KEY ("id")
) WITH (OIDS = FALSE);

CREATE TABLE "sharedPosts" (
	"id" serial NOT NULL,
	"postId" integer NOT NULL,
	"userId" integer NOT NULL,
	"createdAt" TIMESTAMP NOT NULL DEFAULT 'NOW()',
	CONSTRAINT "sharedPosts_pk" PRIMARY KEY ("id")
) WITH (OIDS = FALSE);

ALTER TABLE
	"posts"
ADD
	CONSTRAINT "posts_fk0" FOREIGN KEY ("writerId") REFERENCES "users"("id");

ALTER TABLE
	"hashtagsPosts"
ADD
	CONSTRAINT "hashtagsPosts_fk0" FOREIGN KEY ("postsId") REFERENCES "posts"("id") ON DELETE CASCADE;

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

ALTER TABLE
	"comments"
ADD
	CONSTRAINT "comments_fk0" FOREIGN KEY ("writerId") REFERENCES "users"("id");

ALTER TABLE
	"comments"
ADD
	CONSTRAINT "comments_fk1" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE CASCADE;

ALTER TABLE
	"follows"
ADD
	CONSTRAINT "follows_fk0" FOREIGN KEY ("followerId") REFERENCES "users"("id");

ALTER TABLE
	"follows"
ADD
	CONSTRAINT "follows_fk1" FOREIGN KEY ("followedId") REFERENCES "users"("id");

ALTER TABLE
	"sharedPosts"
ADD
	CONSTRAINT "sharedPosts_fk0" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE CASCADE;

ALTER TABLE
	"sharedPosts"
ADD
	CONSTRAINT "sharedPosts_fk1" FOREIGN KEY ("userId") REFERENCES "users"("id");