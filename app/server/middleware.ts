import { myApp } from "./server";
import express from 'express';
import path from 'path';
import cors from 'cors';
import cookieParser from 'cookie-parser';

myApp.use(cors()) 
myApp.use(express.json())
myApp.use(cookieParser());