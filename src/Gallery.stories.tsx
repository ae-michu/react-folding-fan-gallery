import { Gallery, type GalleryProps } from './Gallery';
import { Card, type CardProps } from './components/Card/Card';
import imgNature1 from '../images/pexels-ceylonframes-37821765.jpg';
import imgNature2 from '../images/pexels-lucas-gramatica-2154251402-35008296.jpg';
import imgNature3 from '../images/pexels-luri-36839846.jpg';
import imgNature4 from '../images/pexels-nadtochiy-photography-2156881367-34422180.jpg';
import imgNature5 from '../images/pexels-shotbyrain-4419894.jpg';

import imgFood1 from '../images/pexels-angel-ayala-321556-28976227.jpg';
import imgFood2 from '../images/pexels-saveurssecretes-6289992.jpg';
import imgFood3 from '../images/pexels-valeriya-kobzar-42371713-8630143.jpg';
import imgFood4 from '../images/pexels-picsfast-8753759.jpg';
import imgFood5 from '../images/pexels-picsfast-8753676.jpg';
import imgFood6 from '../images/pexels-elizabeth-zernetska-86424040-9001223.jpg';
import imgFood7 from '../images/pexels-angel-ayala-321556-28976233.jpg';

export default {
	title: 'Gallery',
	component: Gallery,
	parameters: {
		layout: 'centered',
		previewTabs: {
			canvas: { hidden: true },
			docs: { hidden: false },
		},
	},
};

const natureImages = [
	{ image: imgNature1, alt: 'Image 1' },
	{ image: imgNature2, alt: 'Image 2' },
	{ image: imgNature3, alt: 'Image 3' },
	{ image: imgNature4, alt: 'Image 4' },
	{ image: imgNature5, alt: 'Image 5' },
];

const foodImages = [
	{ image: imgFood1, alt: 'Image 1' },
	{ image: imgFood2, alt: 'Image 2' },
	{ image: imgFood3, alt: 'Image 3' },
	{ image: imgFood4, alt: 'Image 4' },
	{ image: imgFood5, alt: 'Image 5' },
	{ image: imgFood6, alt: 'Image 6' },
	{ image: imgFood7, alt: 'Image 7' },
];

export const FiveCardsDemo = {
	render: (args: GalleryProps<CardProps>) => (
		<div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
			<div style={{ width: '680px' }}>
				<Gallery {...args} />
			</div>
		</div>
	),
	args: {
		renderer: (p?: CardProps) => <Card {...p} />,
		cards: natureImages,
		circleSize: '100%',
		spreadDegrees: 80,
		anchorHeight: '30%',
	},
};

export const SevenCardsDemo = {
	render: (args: GalleryProps<CardProps>) => (
		<div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
			<div style={{ width: '680px' }}>
				<Gallery {...args} />
			</div>
		</div>
	),
	args: {
		renderer: (p?: CardProps) => <Card {...p} />,
		cards: foodImages,
		circleSize: '120%',
		spreadDegrees: 80,
		anchorHeight: '30%',
	},
};

export const DynamicBoundingBoxBottomDemo = {
	render: (args: GalleryProps<string>) => (
		<div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
			<div style={{ width: '680px', borderColor: 'red', borderWidth: '1px', borderStyle: 'solid' }}>
				<Gallery {...args} />
			</div>
		</div>
	),
	args: {
		renderer: (c: string) => <div style={{ width: 120, height: 120, background: c }} />,
		cards: ['#FF7EB3', '#FF758C', '#FDCB6E', '#55EFC4', '#74B9FF'],
		circleSize: '80%',
		spreadDegrees: 80,
		anchorHeight: '30%',
		overflowTop: true,
		overflowBottom: false,
	},
};

export const DynamicBoundingBoxTopDemo = {
	render: (args: GalleryProps<string>) => (
		<div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
			<div style={{ width: '680px', borderColor: 'red', borderWidth: '1px', borderStyle: 'solid' }}>
				<Gallery {...args} />
			</div>
		</div>
	),
	args: {
		renderer: (c: string) => <div style={{ width: 120, height: 120, background: c }} />,
		cards: ['#FF7EB3', '#FF758C', '#FDCB6E', '#55EFC4', '#74B9FF'],
		circleSize: '80%',
		spreadDegrees: 80,
		anchorHeight: '30%',
		overflowTop: false,
		overflowBottom: true,
	},
};

export const DynamicBoundingBoxTopAndBottomDemo = {
	render: (args: GalleryProps<string>) => (
		<div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
			<div style={{ width: '680px', borderColor: 'red', borderWidth: '1px', borderStyle: 'solid' }}>
				<Gallery {...args} />
			</div>
		</div>
	),
	args: {
		renderer: (c: string) => <div style={{ width: 120, height: 120, background: c }} />,
		cards: ['#FF7EB3', '#FF758C', '#FDCB6E', '#55EFC4', '#74B9FF'],
		circleSize: '80%',
		spreadDegrees: 80,
		anchorHeight: '30%',
		overflowTop: false,
		overflowBottom: false,
	},
};

export const Playground = {
	render: (args: GalleryProps<CardProps>) => (
		<div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
			<div style={{ width: '680px' }}>
				<Gallery {...args} />
			</div>
		</div>
	),
	args: {
		renderer: (p?: CardProps) => <Card {...p} image={p?.image || null} />,
		cards: natureImages,
		circleSize: '100%',
		spreadDegrees: 80,
		anchorHeight: '30%',
		scaleLow: 0.8,
		scaleHigh: 1.2,
		overflowTop: true,
		overflowBottom: true,
		debug: false,
	},
	argTypes: {
		renderer: { control: false },
		cards: { control: 'object' },
		circleSize: { control: 'text' },
		spreadDegrees: { control: 'number' },
		anchorHeight: { control: 'text' },
		scaleLow: { control: 'number', min: 0 },
		scaleHigh: { control: 'number', min: 0 },
		overflowTop: { control: 'boolean' },
		overflowBottom: { control: 'boolean' },
		debug: { control: 'boolean', description: 'boolean' },
	},
};
