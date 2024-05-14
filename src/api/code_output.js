import axios from 'axios';
import { LANGUAGE_VERSIONS } from '../data/code_versions';

const API = axios.create({
  baseURL: 'https://emkc.org/api/v2/piston',
});

export const executeCode = async (language, sourceCode) => {
  console.log(language);
  console.log(sourceCode);
  const response = await API.post('/execute', {
    language: language,
    version: LANGUAGE_VERSIONS[language],
    files: [{ content: sourceCode }],
  });

  return response.data;
};
