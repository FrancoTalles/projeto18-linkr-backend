--
-- PostgreSQL database dump
--

-- Dumped from database version 12.14 (Ubuntu 12.14-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.14 (Ubuntu 12.14-0ubuntu0.20.04.1)

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
-- Name: hashtag; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.hashtag (
    id integer NOT NULL,
    "userID" integer NOT NULL,
    "postId" integer NOT NULL,
    hashtag text NOT NULL
);


--
-- Name: hashtag_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.hashtag_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: hashtag_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.hashtag_id_seq OWNED BY public.hashtag.id;


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
-- Name: hashtag id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.hashtag ALTER COLUMN id SET DEFAULT nextval('public.hashtag_id_seq'::regclass);


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
-- Data for Name: hashtag; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: likes; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: posts; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.posts VALUES (1, 1, 'teste', 'https://www.npmjs.com/package/react-icons', '2023-03-10 14:44:45.799064');
INSERT INTO public.posts VALUES (2, 1, 'teste 2 ', 'https://www.npmjs.com/package/react-dotenv', '2023-03-10 15:17:33.07414');
INSERT INTO public.posts VALUES (3, 1, 'teste 3', 'https://www.npmjs.com/package/react-dotenv', '2023-03-10 15:17:55.732048');
INSERT INTO public.posts VALUES (4, 3, 'test', 'https://www.npmjs.com/package/react-dotenv', '2023-03-10 15:26:04.658861');
INSERT INTO public.posts VALUES (5, 3, 'test2', 'https://www.npmjs.com/package/react-dotenv', '2023-03-10 15:26:13.711491');
INSERT INTO public.posts VALUES (6, 1, 'teste 4
', 'https://www.npmjs.com/package/react-dotenv', '2023-03-10 17:11:06.282467');
INSERT INTO public.posts VALUES (7, 1, 'teste 5', 'https://www.npmjs.com/package/react-dotenv', '2023-03-10 17:11:43.02399');


--
-- Data for Name: session; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.session VALUES (1, 1, '6012fd2a-b0cb-4b88-a643-ad92375361d5');
INSERT INTO public.session VALUES (2, 1, '35b3efe4-f316-4e58-bcb3-8628637b3ae6');
INSERT INTO public.session VALUES (3, 1, 'd9820e84-c1b4-4df1-8e02-d91f36d57acc');
INSERT INTO public.session VALUES (4, 1, 'a2343345-e05f-4958-a9f6-06cf394c62bb');
INSERT INTO public.session VALUES (5, 1, '646c7dad-573d-4970-9ac6-6c2358ce7c57');
INSERT INTO public.session VALUES (6, 1, '21cf2963-a445-4433-8ceb-757c2eed93c5');
INSERT INTO public.session VALUES (7, 1, '225d3c6b-b945-49b0-8317-011948829f57');
INSERT INTO public.session VALUES (8, 2, '7ced75b1-a4ab-4fb3-8527-effa53a40f18');
INSERT INTO public.session VALUES (9, 3, 'f1f1d2fb-9f60-4aa1-b51f-35b9cb6ad2d9');
INSERT INTO public.session VALUES (10, 1, 'ddfb61b0-d533-48a1-bb51-2732ef192529');
INSERT INTO public.session VALUES (11, 1, '9498a974-5e86-4b10-8789-5b4d549352af');
INSERT INTO public.session VALUES (12, 1, '0e51dcd2-4802-4dc1-a640-6ece85735abe');
INSERT INTO public.session VALUES (13, 1, '0127ef44-d53b-48e2-8d08-80df0ec051ce');
INSERT INTO public.session VALUES (14, 1, '817d4121-398c-4e44-aadc-ae3e3fe56e57');
INSERT INTO public.session VALUES (15, 1, 'c69620fa-6644-458a-8137-7158506998b3');
INSERT INTO public.session VALUES (16, 1, 'f658685e-1e71-44e4-8163-e8524673d3cb');
INSERT INTO public.session VALUES (17, 1, '225185d2-6027-4a7a-bdaf-9a52dd39d00d');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (1, 'rodrigo@teste.com', '$2b$10$2LtGqanksbRzIW4abdBmS.5v/LwGIBQCx6kx7JTv.3HF5lYhkeSIO', 'rodrigo', 'https://yt3.googleusercontent.com/ytc/AL5GRJWF9DhK1icziCNSd-0dyRCDbOU3_op5GLtFSJo0WA=s900-c-k-c0x00ffffff-no-rj');
INSERT INTO public.users VALUES (2, 'ricardo@gmail.com', '$2b$10$Qi7q9ec40Ry.tvm/ZHWNI.RFxEcH7Cks0jUTAOrCX.j60xGwcVw.2', 'ricardo', 'https://yt3.googleusercontent.com/ytc/AL5GRJWF9DhK1icziCNSd-0dyRCDbOU3_op5GLtFSJo0WA=s900-c-k-c0x00ffffff-no-rj');
INSERT INTO public.users VALUES (3, 'teste@gmail.com', '$2b$10$PaM0Bp7Fcj92Z0/G5WDWkuOofLpDxs6rISOx..xjU8VZImBhjRj7G', 'teste', 'https://d3ugyf2ht6aenh.cloudfront.net/stores/001/868/547/products/estampa-rosa311-3850518b0f8eaa8b1e16367219877443-640-0.webp');


--
-- Name: hashtag_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.hashtag_id_seq', 1, false);


--
-- Name: likes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.likes_id_seq', 1, false);


--
-- Name: posts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.posts_id_seq', 7, true);


--
-- Name: session_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.session_id_seq', 17, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 3, true);


--
-- Name: hashtag hashtag_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.hashtag
    ADD CONSTRAINT hashtag_pkey PRIMARY KEY (id);


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
-- Name: hashtag hashtag_postId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.hashtag
    ADD CONSTRAINT "hashtag_postId_fkey" FOREIGN KEY ("postId") REFERENCES public.posts(id);


--
-- Name: hashtag hashtag_userID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.hashtag
    ADD CONSTRAINT "hashtag_userID_fkey" FOREIGN KEY ("userID") REFERENCES public.users(id);


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

