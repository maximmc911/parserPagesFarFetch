import dotenv from 'dotenv';
import { makeListArray } from "./app/readFile/components/openArr.js"
import { ParseFolder } from "./app/readFile/readFile.js";
dotenv.config();


makeListArray(process.env.pathFolderinArray , process.env.outputPathFolderinArray );
ParseFolder(process.env.outputPathFolderinArray)
