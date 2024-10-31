import { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'

const baseUrl = 'https://cubusfera.com'

function getPathsFromDir(dir: string): string[] {
    let paths: string[] = []
    const files = fs.readdirSync(dir)

    files.forEach(file => {
        const filePath = path.join(dir, file)
        const stat = fs.statSync(filePath)

        if (stat.isDirectory()) {
            paths = paths.concat(getPathsFromDir(filePath))
        } else if (file === 'page.tsx' || file === 'page.js') {
            let routePath = dir.replace(path.join(process.cwd(), 'src', 'app'), '')
            routePath = routePath.replace(/\\/g, '/')
            if (routePath === '') {
                paths.push('/')
            } else if (!routePath.includes('[') && !routePath.includes(']')) {
                // Excluir rutas dinámicas
                paths.push(routePath)
            }
        }
    })

    return paths
}

function getBlogPaths(): string[] {
    const postsDirectory = path.join(process.cwd(), 'posts')
    const fileNames = fs.readdirSync(postsDirectory)

    return fileNames
        .filter(fileName => fileName.endsWith('.md'))
        .map(fileName => `/blog/${fileName.replace(/\.md$/, '')}`)
}

export default function sitemap(): MetadataRoute.Sitemap {
    const appDirectory = path.join(process.cwd(), 'src', 'app')
    const appPaths = getPathsFromDir(appDirectory)
    const blogPaths = getBlogPaths()

    const allPaths = [...appPaths, ...blogPaths]

    const routes = allPaths
        .filter(route => route !== '/blog/[slug]') // Excluir explícitamente /blog/[slug]
        .map(route => {
            let filePath: string
            if (route.startsWith('/blog/')) {
                filePath = path.join(process.cwd(), 'posts', `${route.split('/').pop()}.md`)
            } else {
                filePath = path.join(process.cwd(), 'src', route === '/' ? 'app' : `app${route}`)
            }

            let lastModified = new Date()
            try {
                const stat = fs.statSync(filePath)
                lastModified = stat.mtime
            } catch (error) {
                // Si no se encuentra el archivo, usamos la fecha actual
            }

            return {
                url: `${baseUrl}${route}`,
                lastModified,
                changeFrequency: 'daily' as const,
                priority: route === '/' ? 1 : route.startsWith('/blog/') ? 0.8 : 0.9,
            }
        })

    return routes
}