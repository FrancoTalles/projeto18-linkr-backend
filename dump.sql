--
-- PostgreSQL database dump
--

-- Dumped from database version 14.7 (Ubuntu 14.7-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.7 (Ubuntu 14.7-0ubuntu0.22.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: followers; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.followers (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "followedUser" integer NOT NULL
);


--
-- Name: followers_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.followers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: followers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.followers_id_seq OWNED BY public.followers.id;


--
-- Name: likes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.likes (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "postId" integer NOT NULL,
    liked boolean DEFAULT false NOT NULL
);


--
-- Name: likes_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.likes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: likes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.likes_id_seq OWNED BY public.likes.id;


--
-- Name: posts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.posts (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    description text,
    link text NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: posts_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.posts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: posts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.posts_id_seq OWNED BY public.posts.id;


--
-- Name: reshare; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.reshare (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "postId" integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: reshare_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.reshare_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: reshare_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.reshare_id_seq OWNED BY public.reshare.id;


--
-- Name: session; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.session (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    token text NOT NULL
);


--
-- Name: session_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.session_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: session_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.session_id_seq OWNED BY public.session.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    username text NOT NULL,
    "pictureURL" text NOT NULL
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: followers id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.followers ALTER COLUMN id SET DEFAULT nextval('public.followers_id_seq'::regclass);


--
-- Name: likes id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.likes ALTER COLUMN id SET DEFAULT nextval('public.likes_id_seq'::regclass);


--
-- Name: posts id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.posts ALTER COLUMN id SET DEFAULT nextval('public.posts_id_seq'::regclass);


--
-- Name: session id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.session ALTER COLUMN id SET DEFAULT nextval('public.session_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: followers; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.followers VALUES (3, 1, 2);


--
-- Data for Name: likes; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.likes VALUES (1, 1, 5, true);
INSERT INTO public.likes VALUES (2, 1, 8, true);


--
-- Data for Name: posts; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.posts VALUES (4, 1, 'musica foda #feliz', 'https://www.youtube.com/watch?v=B6JH-fGliPM', '2023-03-10 00:52:23.257935');
INSERT INTO public.posts VALUES (5, 1, 'musica foda #feliz #alegre', 'https://www.youtube.com/watch?v=7gnxtQPf0M4', '2023-03-10 02:39:27.876961');
INSERT INTO public.posts VALUES (6, 1, 'musica foda #feliz #alegre #euforico', 'https://www.youtube.com/watch?v=BOLDiQgk0Os', '2023-03-10 14:52:51.702235');
INSERT INTO public.posts VALUES (7, 2, 'muito legal #feliz', 'https://www.youtube.com/watch?v=I90rnEfBFJE', '2023-03-10 16:03:01.864116');
INSERT INTO public.posts VALUES (8, 2, 'muito feliz #feliz #euforico #euforico', 'https://www.youtube.com/watch?v=YUVf0AFkn1Y', '2023-03-10 16:12:59.469369');


--
-- Data for Name: reshare; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: session; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.session VALUES (1, 1, '0688d9a4-b279-4ac4-986b-dd455cc81970');
INSERT INTO public.session VALUES (2, 2, '99d7f0ab-7d5a-4881-bbbc-2cd1887d580d');
INSERT INTO public.session VALUES (3, 1, 'f047450d-85d6-423f-b5fb-17103a6c33de');
INSERT INTO public.session VALUES (4, 1, '15fd68f1-7535-4571-91ad-d6082147f315');
INSERT INTO public.session VALUES (5, 1, '8dc99bf8-7276-4b5e-b97a-ccbe66dd3473');
INSERT INTO public.session VALUES (6, 1, 'a0678b57-2a67-4e40-a98a-9ede4b45387d');
INSERT INTO public.session VALUES (7, 1, 'a7734806-cd4e-4273-a289-72d5bfe1ce57');
INSERT INTO public.session VALUES (8, 1, 'e7ddb6d8-93e7-48dc-8ccb-bc984e589ff5');
INSERT INTO public.session VALUES (9, 1, '6722426f-b39e-4e4f-9ea0-fab5238d07ce');
INSERT INTO public.session VALUES (10, 1, '2b05e3e7-d48e-401a-8ec8-daeee3bf6748');
INSERT INTO public.session VALUES (11, 1, '83f5ed2c-df5b-458b-9ae7-80375c58900a');
INSERT INTO public.session VALUES (12, 1, 'f2d4535e-d79b-452e-b887-899026953090');
INSERT INTO public.session VALUES (13, 2, 'ff95199b-0f0a-4491-9727-74ca504e2242');
INSERT INTO public.session VALUES (14, 2, '7a3e7c3e-f959-4a6d-911a-2a6d49600293');
INSERT INTO public.session VALUES (15, 3, '41fb2941-afe8-44dc-8a36-67a2654fe90c');
INSERT INTO public.session VALUES (16, 1, '07fdfbcd-1058-4a83-9663-a0cd4c494e67');
INSERT INTO public.session VALUES (17, 1, '5f9ea59a-fed0-43ee-9827-94d7e148723c');
INSERT INTO public.session VALUES (18, 1, 'a101aee3-74cc-48ec-b595-6c6218ade35b');
INSERT INTO public.session VALUES (19, 1, 'fb87bfb1-7d20-412e-bf41-39045c3cafe1');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (1, 'talles@hotmail.com', '$2b$10$8xzUWYhJwYVU1zX.22Arfuhl3r1yXZ.ceZA7nbMZknvVAfhI//lpS', 'talles', 'https://static.wikia.nocookie.net/jjba/images/3/3b/Narancia_Ghirga_Anime.png/revision/latest?cb=20181205005555&path-prefix=pt-br');
INSERT INTO public.users VALUES (2, 'teste@email.com', '$2b$10$4w/irFru2ldavgrvE5qgvuWgPJdsD.NuWGf538TEMqTxOguoJ4Hj6', 'teste', 'https://cdn.awsli.com.br/1029/1029045/produto/113075324/9af59cfbb5.jpg');
INSERT INTO public.users VALUES (3, 'perez@hotmail.com', '$2b$10$/QsJhbvGyaZwoHttNNJ58e.vOY8Ck9kCsrZgRGv0Js3vBDaHdHu0W', 'perez', 'https://img1.ak.crunchyroll.com/i/spire2/f1cfb2cbdf144817f2f289afb42d55171627666826_main.jpg');


--
-- Name: followers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.followers_id_seq', 3, true);


--
-- Name: likes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.likes_id_seq', 2, true);


--
-- Name: posts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.posts_id_seq', 9, true);


--
-- Name: reshare_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.reshare_id_seq', 1, false);


--
-- Name: session_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.session_id_seq', 19, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 3, true);


--
-- Name: followers followers_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.followers
    ADD CONSTRAINT followers_pkey PRIMARY KEY (id);


--
-- Name: likes likes_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_pkey PRIMARY KEY (id);


--
-- Name: posts posts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_pkey PRIMARY KEY (id);


--
-- Name: session session_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.session
    ADD CONSTRAINT session_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: followers followers_followedUser_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.followers
    ADD CONSTRAINT "followers_followedUser_fkey" FOREIGN KEY ("followedUser") REFERENCES public.users(id);


--
-- Name: followers followers_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.followers
    ADD CONSTRAINT "followers_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: likes likes_postId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT "likes_postId_fkey" FOREIGN KEY ("postId") REFERENCES public.posts(id);


--
-- Name: likes likes_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT "likes_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: posts posts_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: session session_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.session
    ADD CONSTRAINT "session_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

