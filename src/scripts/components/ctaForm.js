import {unBannedDomains} from "../utils/unBannedDomains.js";

const formDataCustomize = (_form) => {
	// console.log("🚀 ~ _form:", $("#" + _form.id).serializeArray());
	const dataArray = $("#" + _form.id).serializeArray();

	// phoneCountryCode key'ini kaldır
	const filteredDataArray = dataArray.filter(
		(item) => item.name !== "phoneCountryCode"
	);

	// Filtrelenmiş array'i serialize string'e dönüştür
	const data = $.param(filteredDataArray);
	return data;
};

const ReCaptcha = (_form) => {
	// console.log("🚀 ~ ReCaptcha ~ _form:", _form);

	grecaptcha.ready(function () {
		// console.log("🚀 ~ captchaKey:", captchaKey);
		grecaptcha.execute(captchaKey, { action: "submit" }).then(function (token) {
			// console.log("🚀 ~ .then ~ token:", token);

			if (token.length <= 0) {
				$(".captcha-error").removeClass("d-none");
				return false;
			} else {
				// alert("success");
				_form.submit();
			}
		});
	});
};

const GetParams = (form) => {
	if (!form) return;
	const utmFields = {
		utm_id: {
			name: "utm_id",
			id: "utm_id",
		},
		utm_source: {
			name: "UTM_Source__c",
			id: "00N4I00000F3Trn",
		},
		utm_medium: {
			name: "UTM_Medium__c",
			id: "00N4I00000F3Trs",
		},
		utm_campaign: {
			name: "UTM_Campaign__c",
			id: "00N4I00000F3Trx",
		},
		utm_term: {
			name: "UTM_Term__c",
			id: "00N4I00000F3Ts7",
		},
		utm_content: {
			name: "UTM_Content__c",
			id: "00N4I00000F3Ts2",
		},
		gclid: {
			name: "GCLID__c",
			id: "00N4I00000F3RLu",
		},
	};

	try {
		const params = new URLSearchParams(window.location.search);

		Object.entries(utmFields).forEach(([param, field]) => {
			const value = params.get(param);

			if (!value) return;

			try {
				const inputField = `<input type="hidden" 
                    name="${field.name}" 
                    ${field.id ? `id="${field.id}"` : ""} 
                    value="${encodeURIComponent(value)}">`;

				$(form).prepend(inputField);
			} catch (err) {
				console.warn(`Error adding ${param} parameter to form:`, err);
			}
		});
	} catch (err) {
		console.warn("Error processing UTM parameters:", err);
	}
};


const ctaForm = () => {
    if (document.getElementById('cta')) {
        console.log("#cta form found using pure JS");
    }
    
}

export default ctaForm