import { z, defineCollection } from 'astro:content';

export const collections = {
	blog: defineCollection({
		type: 'content',
		schema: z.object({
			title: z.string(),
			description: z.string(),
			publishDate: z.coerce.date(),
			tags: z.array(z.string()),
			img: z.string(),
			img_alt: z.string().optional(),
		}),

	}),
	work: defineCollection({
		type: 'content',
		schema: z.object({
			title: z.string(),
			employer: z.string(),
			img: z.string(),
			img_alt: z.string().optional(),
			sortValue: z.number(),
			startDate: z.string().optional(),
			endDate: z.string().optional(),
		}),

	}),
	projects: defineCollection({
		type: 'content',
		schema: z.object({
			title: z.string(),
			description: z.string(),
			img: z.string(),
			img_alt: z.string().optional(),
			sorting: z.string().optional(),
		}),

	}),
};
