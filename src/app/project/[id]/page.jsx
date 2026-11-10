import { projectsData } from '@/data/projects';
import ProjectDetailsClient from './ProjectDetailsClient';

export function generateStaticParams() {
  return projectsData.map((project) => ({
    id: String(project.id),
  }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const project = projectsData.find((p) => String(p.id) === String(id));

  if (!project) {
    return {
      title: 'Project Not Found | M. Vishnu Vardhan Reddy',
      description: 'The requested project could not be found.',
    };
  }

  return {
    title: `${project.title} | M. Vishnu Vardhan Reddy`,
    description: project.description,
    openGraph: {
      title: `${project.title} | M. Vishnu Vardhan Reddy`,
      description: project.description,
      images: [
        {
          url: project.image,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} | M. Vishnu Vardhan Reddy`,
      description: project.description,
      images: [project.image],
    },
  };
}

export default async function ProjectPage({ params }) {
  const { id } = await params;
  return <ProjectDetailsClient projectId={id} />;
}
