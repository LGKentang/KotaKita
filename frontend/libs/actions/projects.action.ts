import { Project } from '../types/project.type';

export async function GetAllProjects() {
  try {
    const res = await fetch(process.env.BACKEND_URI + '/projects');
    if (!res.ok) {
      throw new Error(`Error status code ${res.status}`);
    }
    const data = res.json();
    return data;
  } catch (err) {
    throw err;
  }
}

export async function GetProject(id: number) {
  try {
    const res = await fetch(process.env.BACKEND_URI + `/projects/${id}`);
    if (!res.ok) {
      throw new Error(`Error status code ${res.status}`);
    }
    const data = res.json();
    return data;
  } catch (err) {
    throw err;
  }
}

export async function AddProject(projectData: Project) {
  try {
    const res = await fetch(process.env.BACKEND_URI + `/projects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(projectData),
    });
    if (!res.ok) {
      throw new Error(`Error status code ${res.status}`);
    }
    const data = res.json();
    return data;
  } catch (err) {
    throw err;
  }
}
