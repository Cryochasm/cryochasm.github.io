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
	soulpreneurs: defineCollection({
		type: 'content',
		schema: z.object({
			title: z.string(),
			description: z.string(),
			img: z.string(),
			img_alt: z.string().optional(),
		}),

	}),
	event: defineCollection({
		type: 'content',
		schema: z.object({
			title: z.string(),
			description: z.string(),
			img: z.string(),
			img_alt: z.string().optional(),
			sortDate: z.coerce.date(),
			eventDate: z.string(),
			eventTime: z.string(),
			eventLocation: z.string(),
		}),

	}),
};
