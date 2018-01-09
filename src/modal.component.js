import { states } from './states';
import { Observer } from './observer';


export const ModalComponent = {
	el: document.querySelector('.modal_component'),
	imageUrl: '',
	errors: [],
	init: function (image) {
		this.imageUrl = image;
		this.createStatesSelect();
		this.setModalImage();
		this.show();
		this.storeModalVariation();
		this.bootstrapListeners();
	},
	setModalImage: function () {
		let img = document.createElement('img');
		let imageWrapper = this.el.querySelector('.modal-image');
		img.src = this.imageUrl;
		img.id = 'test-image';
		img.width = 275;
		img.height = 250;
		imageWrapper.appendChild(img);
	},
	show: function () {
		this.el.style.display = 'block';
	},
	createStatesSelect: function () {
		let statesWrapper = this.el.querySelector('#states');
		let selectStatesElement = '<select id="state" name="State" class="states form-control">';
		selectStatesElement += '<option selected hidden>State</option>';
		states.forEach((state, index) => {
			selectStatesElement += `<option value="${state}">${state}</option>`
		});
		selectStatesElement += '</select>';
		statesWrapper.innerHTML = selectStatesElement;
	},
	insertImage: function (imageEle) {
		let imageWrapper = this.el.querySelector('.modal-image');
		imageWrapper.innerHTML = imageEle;
	},
	storeModalVariation: function () {
		sessionStorage.setItem("variationIdentifier", this.imageUrl);
	},
	validateInput: function validateInput(e) {
		console.log(`Input value: ${e.target.value}`);
		this.validateEmail(e.target.value, (validation) => {
			if (validation === 'error') {
				if (this.errors && !this.errors.includes('emailError')) {
					this.errors.push('emailError');
				}
				let email = document.getElementById('email');
				email.style.backgroundColor = 'red';
				email.style.color = 'white';
				email.value = 'invalid email';
			} else if (validation === 'valid') {
				this.errors = [];
				email.style.backgroundColor = 'white';
				email.style.color = '#b3b3b3';
			}
		});
	},
	close: function close() {
		this.el.querySelector('.modal-image').innerHTML = '';
		this.imageUrl = '';
		this.el.style.display = 'none';
		Observer.broadcast('close', {
			message: 'modal closed!'
		});
		this.el.querySelector('.close').removeEventListener('click', this);
	},
	validateEmail: function (emailValue, cb) {
		let regx = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
		let email = document.getElementById('email');
		if (emailValue === "" || !regx.test(emailValue)) {
			cb('error');
		} else {
			cb('valid');
		}
	},
	submit: function submit(event) {
		event.preventDefault();
		this.fetchFormValues();
		this.el.querySelector('.modal_component_form').removeEventListener('submit', this);
	},
	fetchFormValues: function () {
		const formFields = [
			'name',
			'email',
			'phone',
			'address',
			'city',
			'state',
			'zipcode'
    ];
		let valuesMap = {};
		formFields.forEach((field) => {
			if (field === 'state') {
				let stateSelect = document.getElementById(field);
				valuesMap[field] = stateSelect.options[stateSelect.selectedIndex].value;
			} else {
				valuesMap[field] = document.getElementById(field).value;
			}

		});
		valuesMap['layoutVariation'] = sessionStorage.getItem('variationIdentifier');
		console.log('the form field along with the layout variation type: ');
		console.log(JSON.stringify(valuesMap));

	},
	handleEvent: function (e) {
		switch (e.type) {
		case 'click':
			{
				this.close(e);
			}
			break;
		case 'change':
			{
				this.validateInput(e);
			}
			break;
		case 'submit':
			{
				this.submit(e);
			}
			break;

		}
	},
	bootstrapListeners: function () {
		this.el.getElementById('email').addEventListener('change', this);
		this.el.querySelector('.close').addEventListener('click', this);
		this.el.querySelector('.modal_component_form').addEventListener('submit', this);
	}

};