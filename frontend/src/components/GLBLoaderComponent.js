import React, { useEffect, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import {AnimationMixer, LoopRepeat} from 'three';

import refrigerator from 'assets/refrigerator.glb';

function GLBLoaderComponent() {
	const mountRef = React.useRef(null);

	const clock = new THREE.Clock();

	useEffect(() => {
		const currentMount = mountRef.current;

		const scene = new THREE.Scene();
		const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
		renderer.setSize(window.innerWidth, window.innerHeight);
		currentMount.appendChild(renderer.domElement);

		const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
		scene.add(ambientLight);

		let camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 1, 1000);

		const loader = new GLTFLoader();
		loader.load(refrigerator, function (gltf) {
			const mixer = new AnimationMixer(gltf.scene);

			console.log(gltf);
			scene.add(gltf.scene);

			camera.position.set(10, 1, 0);
			camera.lookAt(0, 0, 0);

			console.log(gltf.animations);
			console.log(gltf.animations.length);

			if (gltf.animations.length === 1) {
				const action = mixer.clipAction(gltf.animations[0]);
				action.setLoop(LoopRepeat);
				//action.clampWhenFinished = true;
				action.play();
			}

			if (gltf.scenes && gltf.scenes.length > 0) {
				gltf.scenes.forEach((scene) => {
					scene.traverse((node) => {
						if (node.isLight) {
							console.log(node);
							node.intensity *= 0.07;
							scene.add(node);
						}
					});
				});
			}

			function onMouseMove(event) {
				// 화면 중앙을 기준으로 마우스 위치 정규화
				const mouseZ = (event.clientX / window.innerWidth) * 2 - 1;
				const mouseY = 0.5 -(event.clientY / window.innerHeight) * 2 + 1;

				// 카메라 위치 조정 (마우스 위치에 따라)
				camera.position.z = -mouseZ * 2; // 조정 범위와 값은 필요에 따라 변경
				camera.position.y = mouseY * 2;

				// 카메라가 바라보는 방향 조정 (마우스 위치에 따라)
				console.log(scene.position);
				camera.lookAt(0, 0.5, 0);
			}

			window.addEventListener('mousemove', onMouseMove, false);

			// 화면 크기가 변경될 때 Three.js 렌더러를 다시 계산하여 렌더링
			const onWindowResize = () => {
				const newWidth = window.innerWidth;
				const newHeight = window.innerHeight;

				renderer.setSize(newWidth, newHeight);
				camera.aspect = newWidth / newHeight;
				camera.updateProjectionMatrix();
			};

			window.addEventListener('resize', onWindowResize);

			const animate = () => {
				requestAnimationFrame(animate);
				const delta = clock.getDelta();
				mixer.update(delta);
				renderer.render(scene, camera);
			};
			animate();

			return () => {
				currentMount.removeChild(renderer.domElement);
				renderer.dispose();
				window.removeEventListener('resize', onWindowResize);
				// 여기에 추가적인 정리 코드
			};
		});
	}, []);

	return <div ref={mountRef}></div>
}

export default GLBLoaderComponent;