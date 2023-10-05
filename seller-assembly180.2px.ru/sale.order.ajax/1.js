editFadePropsContent: function(node)
		{
			if (!node || !this.locationsInitialized)
				return;

			var errorNode = this.propsHiddenBlockNode.querySelector('.alert'),
				personType = this.getSelectedPersonType(),
				fadeParamName, props,
				group, property, groupIterator, propsIterator, i, validPropsErrors;

			BX.cleanNode(node);

			if (errorNode)
				node.appendChild(errorNode.cloneNode(true));

			if (personType)
			{
				fadeParamName = 'PROPS_FADE_LIST_' + personType.ID;
				props = this.params[fadeParamName];
			}

			if (!props || props.length == 0)
			{
				node.innerHTML += '<span>' + BX.message('SOA_ORDER_PROPS') + '</span>';
			}
			else
			{
				groupIterator = this.fadedPropertyCollection.getGroupIterator();
				while (group = groupIterator())
				{
          console.log(group)
					propsIterator = group.getIterator();
					while (property = propsIterator())
					{
            console.log(props)
						for (i = 0; i < props.length; i++)
							if (props[i] == property.getId() && property.getSettings()['IS_ZIP'] != 'Y')
								this.getPropertyRowNode(property, node, true);
					}
				}
			}

			if (this.propsBlockNode.getAttribute('data-visited') == 'true')
			{
				validPropsErrors = this.isValidPropertiesBlock();
				if (validPropsErrors.length)
					this.showError(this.propsBlockNode, validPropsErrors);
			}

			BX.bind(node.querySelector('.alert.alert-danger'), 'click', BX.proxy(this.showByClick, this));
			BX.bind(node.querySelector('.alert.alert-warning'), 'click', BX.proxy(this.showByClick, this));
		},