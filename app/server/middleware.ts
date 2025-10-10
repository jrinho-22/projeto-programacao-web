import { myApp } from "./server";
import express from 'express';
import path from 'path';
import cors from 'cors';

myApp.use(express.static(path.join(__dirname, '../../web')));
myApp.use(cors()) 
myApp.use(express.json())